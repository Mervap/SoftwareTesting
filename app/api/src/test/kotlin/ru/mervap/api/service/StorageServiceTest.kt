package ru.mervap.api.service

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Bean
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig
import ru.mervap.api.entity.SavedField
import ru.mervap.api.entity.User
import ru.mervap.api.fromBase64
import ru.mervap.api.repository.StorageRepository
import ru.mervap.api.safeEq
import ru.mervap.api.toBase64
import java.time.LocalDateTime

@SpringJUnitConfig
class StorageServiceTest {

  @TestConfiguration
  class StorageServiceTestConfiguration {
    @MockBean private lateinit var storageRepository: StorageRepository
    @Bean fun storageService(): StorageService = StorageService(storageRepository)
  }

  @Autowired private lateinit var storageRepository: StorageRepository
  @Autowired private lateinit var storageService: StorageService

  @Test
  fun loadSavedFieldsByUser() {
    val savedFields = listOf(
      SavedField(
        4, testUser, 1, 1, "1".toBase64().toByteArray(), 53,
        LocalDateTime.of(2020, 10, 9, 13, 26)
      ),
      SavedField(
        1, testUser, 1, 1, "0".toBase64().toByteArray(), 1,
        LocalDateTime.of(2020, 10, 5, 3, 20)
      ),
      SavedField(
        3, testUser, 2, 2, "0101".toBase64().toByteArray(), 10,
        LocalDateTime.of(2020, 9, 25, 15, 40)
      )
    )
    given(storageRepository.findByUserOrderBySaveDateDesc(safeEq(testUser))).willReturn(savedFields)
    assertEquals(savedFields, storageService.loadSavedFieldsByUser(testUser))
  }

  @Test
  fun saveAndFind() {
    val savedFields = mutableListOf<SavedField>()
    given(storageRepository.save(any())).will {
      val field = it.arguments.first() as SavedField
      savedFields.add(field)
      field
    }
    given(storageRepository.findByUserOrderBySaveDateDesc(safeEq(testUser))).willReturn(savedFields)

    assertEquals(emptyList<SavedField>(), storageService.loadSavedFieldsByUser(testUser))

    storageService.saveField(testUser, FieldInfo(2, 3, "010001".toBase64(), 10))
    val result = storageService.loadSavedFieldsByUser(testUser)
    assertEquals(1, result.size)

    val first = result.first()
    assertEquals(2, first.columns)
    assertEquals(3, first.rows)
    assertEquals("010001", String(first.aliveArray).fromBase64())
    assertEquals(10, first.iteration)
  }

  companion object {
    private val testUser = User(-1, "Mervap", "b", setOf())
  }
}