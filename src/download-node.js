const
  ProgressBar = require('progress'),
  Gunzip = require('zlib').Gunzip,
  unTar = require('tar').Extract,
  getHttps = require('https').get,
  getHttp = require('http').get,
  stat = require('fs').stat,
  promisify = require('bluebird').promisify,
  statAsync = promisify(stat)

function fetchNodeSource (path, url) {
  const get = url.startsWith('https') ? getHttps : getHttp
  return new Promise((resolve, reject) => {
    get(url, response => {
      const total = Number.parseInt(response.headers['content-length'], 10),
        bar = new ProgressBar(`Downloading Node: :percent`, { total }),
        end = (fn, x) => fn(x) | response.removeAllListeners()

      response.on('data', x => bar.tick(x.length))
      response.pipe(new Gunzip()).pipe(unTar({ path, strip: 1 }))
        .once('end', () => end(resolve))
        .once('error', (e) => end(reject, e))
    }).on('error', reject)
  })
}

module.exports.download = function download (compiler, next) {
  const { src, version, sourceUrl } = compiler.options,
    url = sourceUrl
      || `https://nodejs.org/dist/v${version}/node-v${version}.tar.gz`

  return statAsync(src).then(
    x => !x.isDirectory() && fetchNodeSource(src, url),
    (e) => {
      if (e.code !== 'ENOENT') {
        throw e
      }
      return fetchNodeSource(src, url)
    }
  ).then(next)
}
