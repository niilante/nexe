const
  EOL = require('os').EOL,
  colors = require('chalk'),
  isFn = f => typeof f === 'function'
  logNoop = (x, cb) => {
    isFn(cb) && process.nextTick(cb)
  },
  safeCb = f => isFn(f) ? f : logNoop,
  logLevels = [
    ['verbose', 'green'],
    ['info', 'blue'],
    ['error', 'red']
  ],
  logger = logLevels.reduce((logger, info) => {
    const [level, color] = info
    logger[level] = function (output, cb) {
      process.stderr.write(colors[color](`${EOL}[${level}]: ${output}`), safeCb(cb))
    }
    return logger
  }, {
    setLevel (level) {
      if (level === 'silent') {
        return void logLevels.forEach(([level]) => logger[level] = logNoop)
      }
      process.on('beforeExit', () => {
        process.stderr.write(EOL)
      })
      if (level === 'info') {
        logger.verbose = logNoop
      }
    }
  })

module.exports.logger = logger
