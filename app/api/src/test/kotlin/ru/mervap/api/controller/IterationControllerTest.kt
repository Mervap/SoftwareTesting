package ru.mervap.api.controller

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.context.annotation.ComponentScan
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import ru.mervap.api.fromBase64
import ru.mervap.api.toBase64


@WebMvcTest(
  controllers = [IterationController::class],
  excludeFilters = [ComponentScan.Filter(EnableWebSecurity::class)]
)
class IterationControllerTest {

  @Autowired private lateinit var iterationController: IterationController

  @Test
  fun nextIterationDefaultSettings() = doTest(
    """
      01001
      11001
      00000
      00100
      01100
    """.trimIndent(),
    """
      11000
      11000
      01000
      01100
      01100
    """.trimIndent(),
    5, 5
  )

  @Test
  fun nextIterationNotDefault() = doTest(
    """
      11100
      11100
      00000
      00000
      01100
    """.trimIndent(),
    """
      10110
      10110
      11100
      01100
      00000
    """.trimIndent(),
    5, 5, 2, 3, 4
  )

  private fun doTest(
    before: String,
    after: String,
    columns: Int,
    rows: Int,
    cntForBirth: Int = 3,
    minForAlive: Int = 2,
    maxForAlive: Int = 3
  ) {
    val gameInfo = GameInfo(before.replace("\n", "").toBase64(), columns, rows, cntForBirth, minForAlive, maxForAlive)
    val aliveArray = jacksonObjectMapper()
      .readValue(iterationController.nextIteration(gameInfo), AliveArray::class.java)
      .aliveArray
      .fromBase64()
    val actual = buildString {
      for (i in 0 until rows) {
        append(aliveArray.subSequence(i * columns, (i + 1) * columns))
        if (i < rows - 1) {
          append("\n")
        }
      }
    }
    assertEquals(after, actual)
  }

  companion object {
    private data class AliveArray(val aliveArray: String)
  }
}