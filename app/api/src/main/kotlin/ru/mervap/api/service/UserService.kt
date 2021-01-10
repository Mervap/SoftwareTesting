package ru.mervap.api.service

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import ru.mervap.api.entity.Role
import ru.mervap.api.entity.User
import ru.mervap.api.repository.RoleRepository
import ru.mervap.api.repository.UserRepository
import java.util.*

@Service
class UserService(
  private val userRepository: UserRepository,
  private val roleRepository: RoleRepository,
  private val bCryptPasswordEncoder: BCryptPasswordEncoder
) : UserDetailsService {

  @Throws(UsernameNotFoundException::class)
  override fun loadUserByUsername(username: String): UserDetails {
    return userRepository.findByUsername(username) ?: throw UsernameNotFoundException("User not found")
  }

  fun saveUser(user: User): Boolean {
    val userFromDB = userRepository.findByUsername(user.username)
    if (userFromDB != null) return false

    if (!roleRepository.existsById(1L)) {
      roleRepository.save(Role(1L, "ROLE_USER"))
    }
    user.roles = Collections.singleton(Role(1L, "ROLE_USER"))
    user.password = bCryptPasswordEncoder.encode(user.password)
    userRepository.save(user)
    return true
  }
}