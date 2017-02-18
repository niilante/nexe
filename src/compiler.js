const
  normalizeOptions = require('./options').normalize

class NexeCompiler {
  constructor (options) {
    this.options = normalizeOptions(options)
  }
}

module.exports.NexeCompiler = NexeCompiler
