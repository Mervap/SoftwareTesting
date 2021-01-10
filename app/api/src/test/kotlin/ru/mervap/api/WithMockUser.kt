package ru.mervap.api

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.test.context.support.WithSecurityContext
import org.springframework.security.test.context.support.WithSecurityContextFactory
import ru.mervap.api.entity.Role
import ru.mervap.api.entity.User


@WithSecurityContext(factory = WithMockCustomUserSecurityContextFactory::class)
annotation class WithMockUser(val username: String = "Mervap")

class WithMockCustomUserSecurityContextFactory : WithSecurityContextFactory<WithMockUser> {
  override fun createSecurityContext(customUser: WithMockUser): SecurityContext {
    val context = SecurityContextHolder.createEmptyContext()
    val principal = User(1, customUser.username, "hehehhe", setOf(Role(1, "ROLE_USER")))
    val auth = UsernamePasswordAuthenticationToken(principal, "password", principal.authorities)
    context.authentication = auth
    return context
  }
}