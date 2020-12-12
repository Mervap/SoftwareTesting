package ru.mervap.api.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import java.lang.Exception


@Configuration
class MvcConfig : WebMvcConfigurer {

  override fun addCorsMappings(registry: CorsRegistry) {
    registry.addMapping("/**")
      .allowedOrigins("http://localhost:3000")
      .allowedMethods("*");
  }

  override fun addViewControllers(registry: ViewControllerRegistry) {
    registry.addViewController("/login").setViewName("login")
//    registry.addViewController("/news").setViewName("news")
  }
}