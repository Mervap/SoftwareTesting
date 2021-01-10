package ru.mervap.api.controller

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.mockito.Mockito.mock
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.HttpStatus
import org.springframework.validation.BindingResult
import ru.mervap.api.entity.User
import ru.mervap.api.safeEq
import ru.mervap.api.service.UserService


@WebMvcTest(controllers = [RegistrationController::class])
class RegistrationControllerTest {

  @MockBean private lateinit var userService: UserService
  @Autowired private lateinit var registrationController: RegistrationController

  @Test
  fun correctRegistration() {
    given(userService.saveUser(safeEq(testUser))).willReturn(true)
    val response = registrationController.addUser(
      UserInfo(testUser.username, testUser.password, testUser.password),
      mock(BindingResult::class.java)
    )
    assertEquals(HttpStatus.OK, response.statusCode)
    assertNull(response.body)
  }

  @Test
  fun passwordDoesntMatch() {
    given(userService.saveUser(safeEq(testUser))).willReturn(true)
    val response = registrationController.addUser(
      UserInfo(testUser.username, testUser.password, "bubabuba"),
      mock(BindingResult::class.java)
    )
    assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
    assertEquals("Password doesn't match", response.body)
  }

  @Test
  fun userAlreadyExists() {
    given(userService.saveUser(safeEq(testUser))).willReturn(false)
    val response = registrationController.addUser(
      UserInfo(testUser.username, testUser.password, testUser.password),
      mock(BindingResult::class.java)
    )
    assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
    assertEquals("User with such username already exists", response.body)
  }

  @Test
  fun saveUserException() {
    given(userService.saveUser(safeEq(testUser))).willThrow(RuntimeException::class.java)
    val response = registrationController.addUser(
      UserInfo(testUser.username, testUser.password, testUser.password),
      mock(BindingResult::class.java)
    )
    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.statusCode)
    assertEquals("Exception during registration", response.body)
  }

  companion object {
    private val testUser = User(-1, "Me", "hd18nfw91", emptySet())
  }
}