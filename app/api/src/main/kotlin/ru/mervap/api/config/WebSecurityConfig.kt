package ru.mervap.api.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import ru.mervap.api.service.UserService
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
      .antMatchers("/login", "/registration").not().fullyAuthenticated()
      // Only for authorized
      .antMatchers("/logout", "/get_username", "/save_field", "/get_saved_fields").hasRole("USER")
      // Other for all
      .anyRequest().permitAll()
      .and()
      .formLogin()
      .loginPage("/login")
      .defaultSuccessUrl("/")
      .successHandler { _, response, _ -> response.status = 200 }
      .failureHandler { _, response, _ -> response.sendError(403) }
      .and()
      .logout()
      .logoutSuccessHandler { _, response, authentication ->
        if (authentication != null) response.status = 200
        else response.status = 401
      }
      .and()
      .exceptionHandling().authenticationEntryPoint { _, response, authException ->
        if (authException != null) {
          response.status = HttpServletResponse.SC_UNAUTHORIZED
          response.writer.print("Unauthorized")
        }
      }
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