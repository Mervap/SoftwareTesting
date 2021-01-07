package ru.tinkoff.load.myservice

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import ru.tinkoff.gatling.config.SimulationConfig._
import ru.tinkoff.load.myservice.scenarios.CommonScenario

class Debug extends Simulation {

  // proxy is required on localhost:8888

  setUp(
    CommonScenario().inject(atOnceUsers(1))
  ).protocols(
      httpProtocol
        .proxy(Proxy("localhost", 8888).httpsPort(8888))
    )
    .maxDuration(testDuration)

}
