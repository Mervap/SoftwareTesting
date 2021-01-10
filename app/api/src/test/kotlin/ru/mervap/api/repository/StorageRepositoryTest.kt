package ru.mervap.api.repository

import org.junit.ClassRule
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.util.TestPropertyValues
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.ConfigurableApplicationContext
import org.springframework.test.context.ContextConfiguration
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import ru.mervap.api.entity.Role
import ru.mervap.api.entity.SavedField
import ru.mervap.api.entity.User
import ru.mervap.api.toBase64
import java.time.LocalDateTime

@ClassRule
@Container
private val postgreSQLContainer: PostgreSQLContainer<*> =
  PostgreSQLContainer<PostgreSQLContainer<*>>("postgres:latest")
    .withDatabaseName("tests-db")
    .withUsername("root")
    .withPassword("root_pass")

class StorageRepositoryTestInitializer : ApplicationContextInitializer<ConfigurableApplicationContext> {
  override fun initialize(configurableApplicationContext: ConfigurableApplicationContext) {
    postgreSQLContainer.start()
    TestPropertyValues.of(
      "spring.datasource.url=" + postgreSQLContainer.jdbcUrl,
      "spring.datasource.username=" + postgreSQLContainer.username,
      "spring.datasource.password=" + postgreSQLContainer.password
    ).applyTo(configurableApplicationContext.environment)
  }
}

@Testcontainers
@SpringBootTest
@ContextConfiguration(initializers = [StorageRepositoryTestInitializer::class])
class StorageRepositoryTest {

  @Autowired private lateinit var storageRepository: StorageRepository
  @Autowired private lateinit var userRepository: UserRepository
  @Autowired private lateinit var roleRepository: RoleRepository

  @Test
  fun findByUserOrderBySaveDateDesc() {
    val role = roleRepository.save(Role(1, "ROLE_USER"))
    val testUser = userRepository.save(User(-1, "TestUser", "hd18nfw91", setOf(role)))
    val anotherUser = userRepository.save(User(-1, "AnotherUser", "bugabuga", setOf(role)))
    val beforeAdd = storageRepository.findByUserOrderBySaveDateDesc(testUser)
    assertEquals(0, beforeAdd.size)

    val savedFields = listOf(
      SavedField(
        1, testUser, 1, 1, "0".toBase64().toByteArray(), 1,
        LocalDateTime.of(2020, 10, 5, 3, 20)
      ),
      SavedField(
        2, anotherUser, 1, 2, "01".toBase64().toByteArray(), 5,
        LocalDateTime.of(2020, 10, 6, 3, 20)
      ),
      SavedField(
        3, testUser, 2, 2, "0101".toBase64().toByteArray(), 10,
        LocalDateTime.of(2020, 9, 25, 15, 40)
      ),
      SavedField(
        4, testUser, 1, 1, "1".toBase64().toByteArray(), 53,
        LocalDateTime.of(2020, 10, 9, 13, 26)
      ),
    )
    storageRepository.saveAll(savedFields)
    val afterAdd = storageRepository.findByUserOrderBySaveDateDesc(testUser)
    assertEquals(listOf(savedFields[3], savedFields[0], savedFields[2]), afterAdd)
    storageRepository.deleteAll(savedFields)
  }
}