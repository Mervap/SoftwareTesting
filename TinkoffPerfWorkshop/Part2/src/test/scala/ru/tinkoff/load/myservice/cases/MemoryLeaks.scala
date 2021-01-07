package ru.tinkoff.load.myservice.cases

import io.gatling.core.Predef._
import io.gatling.http.Predef._

object MemoryLeaks {

  val memoryLeak1 = http("/memoryleaks/1/")
    .get("/memoryleaks/1")
    .queryParam("counter", "${sequentialInt}")
    .check(status is 200)
    .check(status.not(401), regex("""Memory Leak Through static Fields - (\w+)""").is("counter"))

  val memoryLeak2 = http("/memoryleaks/2/")
    .get("/memoryleaks/2")
    .queryParam("counter", "${sequentialInt}")
    .check(status is 200)
    .check(status.not(402), regex("""Improper (\w+)""").is("equals"))

	val memoryLeak3 = http("/memoryleaks/3/")
		.get("/memoryleaks/3")
		.queryParam("url","${URL}")
		.check(status is 200)
		.check(status.not(403), regex("""UnclosedStream""").exists)

}
