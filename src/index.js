const
  compose = require('app-builder').compose,
  download = require('./download-node').download,
  NexeCompiler = require('./compiler').NexeCompiler,
  argv = require('./options').argv

function compile(options) {
  const compiler = new NexeCompiler(options)

  const main = compose(
    download
  )
  return main(compiler)
}

module.exports.compile = compile
module.exports.argv = argv
