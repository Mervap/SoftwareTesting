package ru.tinkoff.load.myservice.scenarios

import io.gatling.core.Predef._
import io.gatling.core.structure.ScenarioBuilder
import ru.tinkoff.load.myservice.cases._
import ru.tinkoff.load.myservice.feeders.Feeders._

object CommonScenario {
  def apply(): ScenarioBuilder = new CommonScenario().scn
}

class CommonScenario {

  val scn: ScenarioBuilder = scenario("Common Scenario")
    .feed(randomRangeString)
    .feed(sequentialInt)
    .feed(resourcesUrl)
    .randomSwitch(
      30.0 -> exec(GetMainPage.getMainPage),
      30.0 -> exec(GetMainPage.postMainPage),
      13.0 -> exec(MemoryLeaks.memoryLeak1),
      13.0 -> exec(MemoryLeaks.memoryLeak2),
      14.0 -> exec(MemoryLeaks.memoryLeak3)
    )

}