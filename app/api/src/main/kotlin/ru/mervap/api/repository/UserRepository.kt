package ru.mervap.api.repository

import org.springframework.data.repository.CrudRepository
import ru.mervap.api.entity.User

interface UserRepository : CrudRepository<User, Long> {
  fun findByUsername(username: String): User?
}