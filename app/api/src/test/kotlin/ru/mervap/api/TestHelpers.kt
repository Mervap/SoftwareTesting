package ru.mervap.api

import org.mockito.ArgumentMatchers.eq
import ru.mervap.api.controller.UserInfo
import ru.mervap.api.entity.User
import java.util.*

fun <T> safeEq(value: T): T = eq(value) ?: value

data class Username(val username: String)

fun User.getUserInfo(passwordConfirm: String = password) = UserInfo(username, password, passwordConfirm)

fun String.toBase64(): String = Base64.getEncoder().encodeToString(toByteArray())
fun String.fromBase64(): String = String(Base64.getDecoder().decode(toByteArray()))