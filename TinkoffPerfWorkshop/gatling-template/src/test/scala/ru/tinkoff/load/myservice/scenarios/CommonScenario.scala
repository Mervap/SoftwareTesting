package ru.tinkoff.load.myservice.scenarios

import io.gatling.core.Predef._
import io.gatling.core.structure.ScenarioBuilder
import ru.tinkoff.load.myservice.cases._

object CommonScenario {
  def apply(): ScenarioBuilder = new CommonScenario().scn
}

class CommonScenario {

  val scn: ScenarioBuilder = scenario("Common Scenario")
  .exec(GetMainPage.getMainPage)

}