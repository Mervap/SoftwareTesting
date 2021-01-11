package ru.mervap.api.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class MvcConfig : WebMvcConfigurer {

  override fun addCorsMappings(registry: CorsRegistry) {
    registry.addMapping("/**").allowedMethods("*")
  }

  override fun addViewControllers(registry: ViewControllerRegistry) {
    val paths = listOf("/", "/login", "/register", "/storage", "/help")
    for (path in paths) {
      registry.addViewController("/$path").setViewName("forward:/index.html")
    }
  }

  override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
    registry.addResourceHandler("/**").addResourceLocations("classpath:/")
  }
}