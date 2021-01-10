package ru.mervap.api.service

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Bean
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig
import ru.mervap.api.entity.User
import ru.mervap.api.repository.RoleRepository
import ru.mervap.api.repository.UserRepository
import ru.mervap.api.safeEq

@SpringJUnitConfig
class UserServiceTest {

  @TestConfiguration
  class UserServiceTestConfiguration {
    @MockBean private lateinit var userRepository: UserRepository
    @MockBean private lateinit var roleRepository: RoleRepository
    @MockBean private lateinit var bCryptPasswordEncoder: BCryptPasswordEncoder
    @Bean fun userService(): UserService = UserService(userRepository, roleRepository, bCryptPasswordEncoder)
  }

  @Autowired private lateinit var bCryptPasswordEncoder: BCryptPasswordEncoder
  @Autowired private lateinit var userRepository: UserRepository
  @Autowired private lateinit var userService: UserService

  @Test
  fun loadUserByUsername() {
    given(userRepository.findByUsername(safeEq(testUser.username))).willReturn(testUser)
    assertEquals(testUser, userService.loadUserByUsername(testUser.username))
  }

  @Test
  fun loadUserByUsernameException() {
    given(userRepository.findByUsername(safeEq(testUser.username))).willThrow(UsernameNotFoundException::class.java)
    assertThrows<UsernameNotFoundException> { userService.loadUserByUsername(testUser.username) }
  }

  @Test
  fun saveUser() {
    given(bCryptPasswordEncoder.encode(safeEq(testUser.password))).willReturn("encoded")
    given(userRepository.findByUsername(safeEq(testUser.username))).willReturn(null)
    assertEquals(true, userService.saveUser(testUser))
  }

  @Test
  fun saveUserAlreadyExists() {
    given(userRepository.findByUsername(safeEq(testUser.username))).willReturn(testUser)
    assertEquals(false, userService.saveUser(testUser))
  }

  companion object {
    private val testUser = User(-1, "Mervap", "password", setOf())
  }
}