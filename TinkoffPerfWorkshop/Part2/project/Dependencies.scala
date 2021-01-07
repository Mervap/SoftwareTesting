import sbt._

object Dependencies {
  lazy val gatling: Seq[ModuleID] = Seq(
    "io.gatling.highcharts" % "gatling-charts-highcharts",
    "io.gatling"            % "gatling-test-framework"
  ).map(_ % "3.3.1" % Test)

  lazy val gelf: Seq[ModuleID] = Seq(
    "de.siegmar" % "logback-gelf"
  ).map(_ % "3.0.0")

  lazy val gatlingPicatinny: Seq[ModuleID] = Seq(
    "ru.tinkoff" %% "gatling-picatinny"
  ).map(_ % "0.6.1")

  lazy val janino: Seq[ModuleID] = Seq(
    "org.codehaus.janino" % "janino"
  ).map(_ % "3.1.2")

}
