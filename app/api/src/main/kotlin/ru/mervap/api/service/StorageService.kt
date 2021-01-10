package ru.mervap.api.service

import org.springframework.stereotype.Service
import ru.mervap.api.entity.SavedField
import ru.mervap.api.entity.User
import ru.mervap.api.repository.StorageRepository
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZoneOffset

data class FieldInfo(
  var columns: Int,
  var rows: Int,
  var aliveArray: String,
  var iteration: Int
)


@Service
class StorageService(
  private val storageRepository: StorageRepository,
) {
  fun loadSavedFieldsByUser(user: User): List<SavedField> = storageRepository.findByUserOrderBySaveDateDesc(user)

  fun saveField(user: User, fieldInfo: FieldInfo) {
    val (columns, rows, aliveArray, iteration) = fieldInfo
    val nowDate = LocalDateTime.now(ZoneId.ofOffset("UTC", ZoneOffset.ofHours(3)))
    storageRepository.save(SavedField(-1L, user, columns, rows, aliveArray.toByteArray(), iteration, nowDate))
  }
}