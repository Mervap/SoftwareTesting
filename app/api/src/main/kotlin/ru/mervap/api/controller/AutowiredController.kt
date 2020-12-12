package ru.mervap.api.controller

import org.springframework.http.MediaType
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.stereotype.Controller
import org.springframework.ui.Model

import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*

import javax.validation.Valid
import ru.mervap.api.service.UserService
import ru.mervap.api.entity.User
import java.util.*

@Controller
class AutowiredController(
  private val userService: UserService
) {

  @ResponseBody
  @GetMapping("/get_username", produces = [MediaType.APPLICATION_JSON_VALUE])
  fun getUsername(@AuthenticationPrincipal user: User): String {
    return "{\"username\": \"${user.username}\"}"
  }

//  @PostMapping("/registration")
//  fun addUser(@RequestBody userForm: @Valid User,
//              bindingResult: BindingResult,
//              model: Model): String {
//    if (bindingResult.hasErrors()) {
//      return "index"
//    }
//    if (userForm.password != userForm.passwordConfirm) {
//      model.addAttribute("passwordError", "Пароли не совпадают")
//      return "index"
//    }
//    if (!userService.saveUser(userForm)) {
//      model.addAttribute("usernameError", "Пользователь с таким именем уже существует")
//      return "index"
//    }
//    return "index"
//  }
}