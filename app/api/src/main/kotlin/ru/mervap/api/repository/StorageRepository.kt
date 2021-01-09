package ru.mervap.api.repository

import org.springframework.data.domain.Sort
import org.springframework.data.repository.CrudRepository
import org.springframework.transaction.annotation.Transactional
import ru.mervap.api.entity.SavedField
import ru.mervap.api.entity.User

interface StorageRepository : CrudRepository<SavedField, Long> {
  fun findByUserOrderBySaveDateDesc(user: User): List<SavedField>
}