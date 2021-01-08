package ru.mervap.api.config

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import ru.mervap.api.service.UserService
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import java.lang.Exception

import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Configuration
@EnableWebSecurity
class WebSecurityConfig : WebSecurityConfigurerAdapter() {

  @Autowired
  lateinit var userService: UserService

  @Bean
  fun bCryptPasswordEncoder(): BCryptPasswordEncoder = BCryptPasswordEncoder()

  @Throws(Exception::class)
  override fun configure(httpSecurity: HttpSecurity) {
    httpSecurity
      .csrf()
      .disable()
      .cors()
      .configurationSource(corsConfigurationSource)
      .and()
      .authorizeRequests()
      // Only for non-authorized
      .antMatchers("/registration").not().fullyAuthenticated()
      // Only for authorized
      .antMatchers("/my_saves", "/get_username").hasRole("USER")
      // Other for all
      .anyRequest().permitAll()
      .and()
      .formLogin()
      .loginPage("/login")
      .defaultSuccessUrl("/")
      .permitAll()
      .successHandler { _, response, _ -> response.status = 200 }
      .failureHandler { _, response, _ -> response.sendError(400) }
      .and()
      .logout()
      .logoutSuccessHandler { _, response, _ -> response.status = 200 }
      .permitAll()
      .logoutSuccessUrl("/")
  }

  private val corsConfigurationSource: CorsConfigurationSource
    get() {
      val configuration = CorsConfiguration()
      configuration.allowedOriginPatterns = listOf("*")
      configuration.allowedMethods = listOf("GET", "POST")
      configuration.allowCredentials = true
      configuration.allowedHeaders = listOf("*")
      val source = UrlBasedCorsConfigurationSource()
      source.registerCorsConfiguration("/**", configuration)
      return source
    }

  @Autowired
  protected fun configureGlobal(auth: AuthenticationManagerBuilder) {
    auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder())
  }
}