package ru.tinkoff.load.myservice.cases

import io.gatling.http.Predef._
import io.gatling.core.Predef._

object GetMainPage {

  val getMainPage = http("GET /get")
    .get("/get")
    .queryParam("session_id", "${randomStr}")
    .check(status is 200)
    .check(status.not(400), regex("""Successful (\w+) response""").is("get"))

  val postMainPage = http("POST /")
    .post("/post")
    .queryParam("session_id", "${randomStr}")
    .check(status is 200)
    .check(status.not(400), regex("""Successful (\w+) response""").is("post"))

}
