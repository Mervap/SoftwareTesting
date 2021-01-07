package ru.tinkoff.load.myservice.feeders

import ru.tinkoff.gatling.feeders._
import io.gatling.core.Predef._

object Feeders {

  val randomRangeString =
    RandomRangeStringFeeder("randomStr", 23, 33, "ABCDEF123456789")

  val sequentialInt = SequentialFeeder("sequentialInt", 10000, 1)

  val resourcesUrl = csv("pools/resURL.csv").eager.random
}
