package ru.mervap.api.controller

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import ru.mervap.api.Username
import ru.mervap.api.WithMockUser
import ru.mervap.api.entity.User
import ru.mervap.api.safeEq
import ru.mervap.api.service.FieldInfo
import ru.mervap.api.service.StorageService

@SpringBootTest(classes = [AuthenticatedController::class])
class AuthenticatedControllerTest {

  @Autowired private lateinit var authenticatedController: AuthenticatedController
  @MockBean private lateinit var storageService: StorageService

  private val objectMapper = jacksonObjectMapper()

  @Test
  @WithMockUser
  fun getUsername() = doTest {
    val username = objectMapper.readValue(authenticatedController.getUsername(it), Username::class.java)
    assertEquals("Mervap", username.username)
  }

  @Test
  @WithMockUser
  fun saveField() = doTest {
    val field = FieldInfo(5, 5, "0".repeat(5 * 5), 10)
    given(storageService.saveField(safeEq(it), safeEq(field))).willAnswer {}
    val response = authenticatedController.saveField(it, field)
    assertEquals(HttpStatus.OK, response.statusCode)
    assertNull(response.body)
  }

  @Test
  @WithMockUser
  fun saveFieldException() = doTest {
    val field = FieldInfo(5, 5, "0".repeat(5 * 5), 10)
    given(storageService.saveField(safeEq(it), safeEq(field))).willThrow(RuntimeException::class.java)
    val response = authenticatedController.saveField(it, field)
    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.statusCode)
    assertEquals("Exception during saving field", response.body)
  }

  private fun doTest(body: (User) -> Unit) {
    val context = SecurityContextHolder.getContext()
    assertNotNull(context)
    val authentication = context.authentication.principal as User
    body(authentication)
  }
}