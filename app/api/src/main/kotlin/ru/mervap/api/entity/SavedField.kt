package ru.mervap.api.entity

import java.time.LocalDateTime
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "saved_fields")
class SavedField(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  var id: Long,
  @ManyToOne
  var user: User,
  var columns: Int,
  var rows: Int,
  var aliveArray: ByteArray,
  var iteration: Int,
  var saveDate: LocalDateTime
)