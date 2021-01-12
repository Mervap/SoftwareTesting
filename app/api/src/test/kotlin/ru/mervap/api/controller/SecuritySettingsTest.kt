package ru.mervap.api.controller

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.postForEntity
import org.springframework.http.*
import org.springframework.http.client.SimpleClientHttpRequestFactory
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import ru.mervap.api.entity.Role
import ru.mervap.api.entity.User
import ru.mervap.api.getUserInfo
import ru.mervap.api.safeEq
import ru.mervap.api.service.FieldInfo
import ru.mervap.api.service.UserService
import ru.mervap.api.toBase64

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class SecuritySettingsTest {

  @MockBean private lateinit var authenticatedController: AuthenticatedController
  @MockBean private lateinit var registrationController: RegistrationController
  @MockBean private lateinit var userService: UserService
  @Autowired private lateinit var template: TestRestTemplate
  private val bCryptPasswordEncoder = BCryptPasswordEncoder()

  @BeforeEach
  fun setUp() {
    (template.restTemplate.requestFactory as SimpleClientHttpRequestFactory).setOutputStreaming(false)
  }

  @Test
  fun getUsername() = doPermitAuthOnlyTest("/get_username", HttpMethod.GET, "")

  @Test
  fun saveField() = doPermitAuthOnlyTest("/save_field", HttpMethod.POST, FieldInfo(1, 1, "0".toBase64(), 1))

  @Test
  fun getSavedFields() = doPermitAuthOnlyTest("/get_saved_fields", HttpMethod.GET, "")

  @Test
  fun logout() = doPermitAuthOnlyTest("/logout", HttpMethod.GET, "")

  @Test
  fun registration() = doPermitAnonymousOnlyTest("/registration", HttpMethod.POST, testUser.getUserInfo())

  @Test
  fun nextIteration() {
    val path = "/next_iteration"
    val method = HttpMethod.POST
    val body = GameInfo("0".toBase64(), 1, 1, 3, 2, 3)
    doTestWithAuth(path, method, body) { assertEquals(HttpStatus.OK, it.statusCode) }
    doTestWithoutAuth(path, method, body) { assertEquals(HttpStatus.OK, it.statusCode) }
  }

  private fun <BodyType> doPermitAuthOnlyTest(path: String, method: HttpMethod, body: BodyType) {
    doTestWithAuth(path, method, body) { assertEquals(HttpStatus.OK, it.statusCode) }
    doTestWithoutAuth(path, method, body) { assertEquals(HttpStatus.UNAUTHORIZED, it.statusCode) }
  }

  private fun <BodyType> doPermitAnonymousOnlyTest(path: String, method: HttpMethod, body: BodyType) {
    doTestWithoutAuth(path, method, body) { assertEquals(HttpStatus.OK, it.statusCode) }
    doTestWithAuth(path, method, body) { assertEquals(HttpStatus.FORBIDDEN, it.statusCode) }
  }

  private fun <BodyType> doTestWithoutAuth(
    path: String,
    method: HttpMethod,
    body: BodyType,
    check: (ResponseEntity<String>) -> Unit
  ) {
    given(userService.loadUserByUsername(safeEq(anotherUser.username))).willReturn(anotherUser)
//    given(userService.loadUserByUsername(anyString())).willThrow(UsernameNotFoundException("User not found"))
    val response = template.exchange(path, method, HttpEntity(body, null), String::class.java)
    check(response)
  }

  private fun <BodyType> doTestWithAuth(
    path: String,
    method: HttpMethod,
    body: BodyType,
    check: (ResponseEntity<String>) -> Unit
  ) {
    given(userService.loadUserByUsername(safeEq(testUser.username))).willReturn(testUser)
    val loginResponse = template.postForEntity<String>("/login?username=${testUser.username}&password=12345678", null)
    assertEquals(HttpStatus.OK, loginResponse.statusCode)
    val cookie = loginResponse.headers["Set-Cookie"]?.get(0) ?: throw RuntimeException("No cookies after login")

    val headers = HttpHeaders()
    headers.add("Cookie", cookie)
    val response = template.exchange(path, method, HttpEntity(body, headers), String::class.java)
    check(response)
  }

  private val testUser = User(
    1, "TestUser",
    bCryptPasswordEncoder.encode("12345678"),
    setOf(Role(1, "ROLE_USER"))
  )

  private val anotherUser = User(
    2, "AnotherUser",
    bCryptPasswordEncoder.encode("12345678"),
    setOf(Role(1, "ROLE_USER"))
  )
}