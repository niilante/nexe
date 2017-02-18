const
  compose = require('app-builder').compose,
  download = require('./download-node').download,
  NexeCompiler = require('./compiler').NexeCompiler,
  argv = require('./options').argv

const pipeline = compose(
  download
)

function compile(options) {
  pipeline(new NexeCompiler(options))
}

module.exports.compile = compile
module.exports.argv = argv
