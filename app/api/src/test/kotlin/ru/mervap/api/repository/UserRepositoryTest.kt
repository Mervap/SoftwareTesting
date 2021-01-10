package ru.mervap.api.repository

import org.junit.ClassRule
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.util.TestPropertyValues
import org.springframework.context.ApplicationContextInitializer
import org.springframework.context.ConfigurableApplicationContext
import org.springframework.test.context.ContextConfiguration
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import ru.mervap.api.entity.Role
import ru.mervap.api.entity.User

@ClassRule
@Container
private val postgreSQLContainer: PostgreSQLContainer<*> =
  PostgreSQLContainer<PostgreSQLContainer<*>>("postgres:latest")
    .withDatabaseName("tests-db")
    .withUsername("root")
    .withPassword("root_pass")

class UserRepositoryTestInitializer : ApplicationContextInitializer<ConfigurableApplicationContext> {
  override fun initialize(configurableApplicationContext: ConfigurableApplicationContext) {
    postgreSQLContainer.start()
    TestPropertyValues.of(
      "spring.datasource.url=" + postgreSQLContainer.jdbcUrl,
      "spring.datasource.username=" + postgreSQLContainer.username,
      "spring.datasource.password=" + postgreSQLContainer.password
    ).applyTo(configurableApplicationContext.environment)
  }
}

@Testcontainers
@SpringBootTest
@ContextConfiguration(initializers = [UserRepositoryTestInitializer::class])
class UserRepositoryTest {

  @Autowired private lateinit var userRepository: UserRepository
  @Autowired private lateinit var roleRepository: RoleRepository

  @Test
  fun findByUsername() {
    val userRole = roleRepository.save(Role(1, "ROLE_USER"))
    var testUser = User(-1, "TestUser", "hd18nfw91", setOf(userRole))
    val beforeUser = userRepository.findByUsername(testUser.username)?.username
    assertNull(beforeUser)

    testUser = userRepository.save(testUser)
    val afterUser = userRepository.findByUsername(testUser.username)?.username
    assertEquals(testUser.username, afterUser)
  }
}