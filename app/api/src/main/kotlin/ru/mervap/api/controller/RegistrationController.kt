package ru.mervap.api.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody
import ru.mervap.api.entity.User
import ru.mervap.api.service.UserService
import java.util.logging.Level
import java.util.logging.Logger
import javax.servlet.http.HttpServletRequest
import javax.validation.Valid
import javax.validation.constraints.Size

data class UserInfo(
  @Size(min = 2, max = 30)
  var username: String,
  @Size(min = 6, max = 60)
  var password: String,
  @Size(min = 6, max = 60)
  var passwordConfirm: String,
)

@Controller
class RegistrationController(private val userService: UserService) {

  @ResponseBody
  @PostMapping("/registration")
  fun addUser(@RequestBody userInfo: @Valid UserInfo, bindingResult: BindingResult, request: HttpServletRequest): ResponseEntity<String> {
    return when {
      bindingResult.hasErrors() -> ResponseEntity("Invalid user info", HttpStatus.BAD_REQUEST)
      userInfo.password != userInfo.passwordConfirm -> {
        ResponseEntity("{\"message\": \"Password doesn't match\"}", HttpStatus.BAD_REQUEST)
      }
      else ->
        try {
          if (!userService.saveUser(User(-1, userInfo.username, userInfo.password, emptySet()))) {
            ResponseEntity("{\"message\": \"User with such username already exists\"}", HttpStatus.BAD_REQUEST)
          }
          else {
            request.login(userInfo.username, userInfo.password)
            ResponseEntity(HttpStatus.OK)
          }
        }
        catch (e: RuntimeException) {
          Logger.getGlobal().log(Level.SEVERE, e.toString())
          ResponseEntity("{\"message\": \"Exception during registration\"}", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
  }
}