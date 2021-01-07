package ru.tinkoff.load.myservice.cases

import io.gatling.http.Predef._
import io.gatling.core.Predef._

object GetMainPage {

  val getMainPage = http("GET /get")
    .get("/get")
    .header("Accept", "application/json")
    .check(status is 200)

}
