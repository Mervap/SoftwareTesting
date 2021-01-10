package ru.mervap.api.entity

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(
  name = "users",
  indexes = [
    Index(name = "id_username_index", columnList = "id,username", unique = true),
    Index(name = "username_id_index", columnList = "username,id", unique = true)
  ]
)
data class User(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  var id: Long,
  @Column(unique = true)
  @Size(min = 2, max = 30)
  private var username: String,
  @Size(min = 6, max = 60)
  private var password: String,
  @JvmSuppressWildcards
  @ManyToMany(fetch = FetchType.EAGER)
  var roles: Set<Role>
) : UserDetails {

  override fun isAccountNonExpired(): Boolean = true

  override fun isAccountNonLocked(): Boolean = true

  override fun isCredentialsNonExpired(): Boolean = true

  override fun isEnabled(): Boolean = true

  override fun getAuthorities(): Collection<GrantedAuthority> = roles

  override fun getUsername(): String = username

  override fun getPassword(): String = password

  fun setUsername(username: String) {
    this.username = username
  }

  fun setPassword(password: String) {
    this.password = password
  }

  companion object {
    public val EMPTY_USER = User(-1, "", "", emptySet())
  }
}