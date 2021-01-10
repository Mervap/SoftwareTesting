package ru.mervap.api.controller

import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody
import ru.mervap.api.entity.User
import ru.mervap.api.service.FieldInfo
import ru.mervap.api.service.StorageService
import java.time.format.DateTimeFormatter
import java.util.logging.Level
import java.util.logging.Logger

@Controller
class AuthenticatedController(private val storageService: StorageService) {

  @ResponseBody
  @GetMapping("/get_username", produces = [MediaType.APPLICATION_JSON_VALUE])
  fun getUsername(@AuthenticationPrincipal user: User): String {
    return "{\"username\": \"${user.username}\"}"
  }

  @ResponseBody
  @PostMapping("/save_field", produces = [MediaType.APPLICATION_JSON_VALUE])
  fun saveField(
    @AuthenticationPrincipal user: User,
    @RequestBody fieldInfo: FieldInfo
  ): ResponseEntity<String> {
    return try {
      storageService.saveField(user, fieldInfo)
      ResponseEntity(HttpStatus.OK)
    }
    catch (e: RuntimeException) {
      Logger.getGlobal().log(Level.SEVERE, e.toString())
      ResponseEntity("Exception during saving field", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ResponseBody
  @GetMapping("/get_saved_fields", produces = [MediaType.APPLICATION_JSON_VALUE])
  fun getSavedFields(@AuthenticationPrincipal user: User): String {
    val savedFields = storageService.loadSavedFieldsByUser(user)
    val dateFormatter = DateTimeFormatter.ofPattern("d MMM yyyy, HH:mm:ss")
    return savedFields.joinToString(", ", "[", "]") {
      "{\"columns\": ${it.columns}, \"rows\": ${it.rows}, " +
      "\"aliveArray\": \"${String(it.aliveArray)}\", \"iteration\": ${it.iteration}, " +
      "\"saveDate\": \"${dateFormatter.format(it.saveDate)}\"}"
    }
  }
}