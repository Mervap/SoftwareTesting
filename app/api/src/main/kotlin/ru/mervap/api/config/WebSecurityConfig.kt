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
    httpSecurity.cors().configurationSource(corsConfigurationSource)
    httpSecurity
      .csrf()
      .disable()
      .cors()
      .configurationSource(corsConfigurationSource)
      .and()
      .authorizeRequests()
      //Доступ только для не зарегистрированных пользователей
      .antMatchers("/registration").not().fullyAuthenticated()
      //Доступ разрешен всем пользователей
      .antMatchers("/my_saves").hasRole("USER")
      .antMatchers("/get_username").hasRole("USER")
      //Все остальные страницы требуют аутентификации
      .anyRequest().permitAll()
      .and()
      //Настройка для входа в систему
      .formLogin()
      .loginPage("/login")
      //Перенарпавление на главную страницу после успешного входа
      .defaultSuccessUrl("/")
      .permitAll()
      .successHandler { _, response, _ -> response.status = 200 }
      .failureHandler { _, response, _ ->
        println("Auf")
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        response.sendError(204)
      }
      .and()
      .logout()
      .logoutSuccessHandler { _, response, _ -> response.status = 200 }
      .permitAll()
      .logoutSuccessUrl("/")
  }

  private val corsConfigurationSource: CorsConfigurationSource
    get() {
      val configuration = CorsConfiguration()
      configuration.allowedOrigins = listOf("http://localhost:3000")
      configuration.allowedMethods = listOf("GET", "POST")
      configuration.allowCredentials = true
      configuration.allowedHeaders = listOf("*")
      val source = UrlBasedCorsConfigurationSource()
      source.registerCorsConfiguration("/**", configuration)
      return source
    }

  @Autowired
  @Throws(Exception::class)
  protected fun configureGlobal(auth: AuthenticationManagerBuilder) {
    auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder())
  }
}