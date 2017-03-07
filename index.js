#!/usr/bin/env node
const nexe = require('./src'),
  logger = require('./src/logger').logger

module.exports = nexe

if (require.main === module) {
  nexe.compile(nexe.argv).catch((e) => {
    logger.error(e.stack, () => process.exit(1))
  })
}
