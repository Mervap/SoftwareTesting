const { teardown: teardownDevServer } = require('jest-process-manager')

module.exports = async () => {
  await teardownDevServer()
  console.log("Teardown successful")
}

export {}