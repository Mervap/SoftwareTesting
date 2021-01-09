package ru.mervap.api.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model

import org.springframework.validation.BindingResult

import javax.validation.Valid
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody
import ru.mervap.api.service.UserService
import ru.mervap.api.entity.User
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
  fun addUser(@RequestBody userInfo: @Valid UserInfo,
              bindingResult: BindingResult,
              model: Model): String {
    when {
      bindingResult.hasErrors() -> return ""
      userInfo.password != userInfo.passwordConfirm -> {
        model.addAttribute("passwordError", "Password doesn't match")
      }
      !userService.saveUser(User(-1, userInfo.username, userInfo.password, emptySet())) -> {
        model.addAttribute("usernameError", "User with such username already exists")
      }
    }
    return ""
  }
}