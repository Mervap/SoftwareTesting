package ru.mervap.api.controller

import org.springframework.http.MediaType
import org.springframework.stereotype.Controller

import org.springframework.web.bind.annotation.*

import ru.mervap.api.service.UserService
import java.util.*

data class GameInfo(val aliveArray: String,
                    val columns: Int,
                    val rows: Int,
                    val cntForBirth: Int,
                    val minForAlive: Int,
                    val maxForAlive: Int)

@Controller
class IterationController(
  private val userService: UserService
) {

  @ResponseBody
  @PostMapping("/next_iteration", produces = [MediaType.APPLICATION_JSON_VALUE])
  fun nextIteration(@RequestBody gameInfo: GameInfo): String {
    val aliveArray = String(Base64.getDecoder().decode(gameInfo.aliveArray))
    val grid = mutableListOf<MutableList<Boolean>>()
    val rows = gameInfo.rows
    val columns = gameInfo.columns
    for (i in 0 until rows) {
      val row = mutableListOf<Boolean>()
      for (j in 0 until columns) {
        row.add(aliveArray[i * columns + j] == '1')
      }
      grid.add(row)
    }

    val dIs = listOf(-1, 0, 1)
    val dJs = listOf(-1, 0, 1)
    val newGrid = buildString {
      for (i in 0 until rows) {
        for (j in 0 until columns) {
          var aliveNeighbors = 0
          for (dI in dIs) {
            for (dJ in dJs) {
              if (dI == 0 && dJ == 0) continue
              val nI = i + dI
              val nJ = j + dJ
              if (nI in 0 until rows && nJ in 0 until columns && grid[nI][nJ]) {
                aliveNeighbors += 1
              }
            }
          }

          if (grid[i][j]) {
            if (aliveNeighbors in gameInfo.minForAlive..gameInfo.maxForAlive) append(1)
            else append(0)
          }
          else {
            if (aliveNeighbors >= gameInfo.cntForBirth) append(1)
            else append(0)
          }
        }
      }
    }
    val encodedGrid = Base64.getEncoder().encodeToString(newGrid.toByteArray())
    return "{\"aliveArray\": \"$encodedGrid\"}"
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