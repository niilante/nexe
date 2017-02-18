#!/usr/bin/env node
var nexe = require('./src')

if (require.main === module) {
  nexe.compile(nexe.argv).catch((e) => {
    process.stderr.write(e, () => process.exit(1))
  })
} else {
  module.exports = nexe
}
