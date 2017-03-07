const
  normalizeOptions = require('./options').normalize
  logger = require('./logger').logger,
  isWindows = process.platform === 'win32'

class NexeCompiler {
  constructor (options) {
    this.options = normalizeOptions(options)
    this.log = this.options.log
    this.log.setLevel(this.options.loglevel)
    this.log.verbose('normalized options')
    this.log.verbose('options: ' + JSON.stringify(this.options, null, 4))
  }

  

}

module.exports.NexeCompiler = NexeCompiler
