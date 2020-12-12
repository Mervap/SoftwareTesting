package ru.mervap.api.entity

import org.springframework.security.core.GrantedAuthority
import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = "user_roles")
class Role(
  @Id
  var id: Long,
  @Size(min = 2, max = 90)
  var name: String,
  @Transient
  @ManyToMany(mappedBy = "roles")
  var users: Set<User> = emptySet()
) : GrantedAuthority {
  override fun getAuthority(): String = name
}