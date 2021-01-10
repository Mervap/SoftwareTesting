package ru.mervap.api.entity

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "saved_fields")
data class SavedField(
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
) {
  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (other !is SavedField) return false

    if (id != other.id) return false
    if (user != other.user) return false
    if (columns != other.columns) return false
    if (rows != other.rows) return false
    if (!aliveArray.contentEquals(other.aliveArray)) return false
    if (iteration != other.iteration) return false
    if (saveDate != other.saveDate) return false

    return true
  }

  override fun hashCode(): Int {
    var result = id.hashCode()
    result = 31 * result + user.hashCode()
    result = 31 * result + columns
    result = 31 * result + rows
    result = 31 * result + aliveArray.contentHashCode()
    result = 31 * result + iteration
    result = 31 * result + saveDate.hashCode()
    return result
  }
}