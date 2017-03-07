const
  Gunzip = require('zlib').Gunzip,
  unTar = require('tar').Extract,
  getHttps = require('https').get,
  getHttp = require('http').get,
  stat = require('fs').stat,
  promisify = require('bluebird').promisify,
  statAsync = promisify(stat)

function fetchNodeSource (path, url, log) {
  const get = url.startsWith('https') ? getHttps : getHttp
  log.info('Downloading Node: ' + url)
  return new Promise((resolve, reject) => {
    get(url, response => {
      const total = Number.parseInt(response.headers['content-length'], 10)
        end = (fn, x) => {
          fn(x)
          log.info('Download Complete')
        },
        status = { l: 0 }

      response.on('data', x => {
        status.l += x.length
        percentComplete = (status.l / total * 100).toFixed()
        if (percentComplete % 10 === 0 && !(percentComplete in status)) {
          status[percentComplete] = percentComplete
          log.verbose(percentComplete + '%' )
        }
      })
      response.pipe(new Gunzip()).pipe(unTar({ path, strip: 1 }))
        .once('end', () => end(resolve))
        .once('error', (e) => end(reject, e))
    }).on('error', reject)
  })
}

function download (compiler, next) {
  const { src, version, sourceUrl, log } = compiler.options,
    url = sourceUrl
      || `https://nodejs.org/dist/v${version}/node-v${version}.tar.gz`

  return statAsync(src).then(
    x => !x.isDirectory() && fetchNodeSource(src, url, log),
    (e) => {
      if (e.code !== 'ENOENT') {
        throw e
      }
      return fetchNodeSource(src, url, log)
    }
  ).then(next)
}

module.exports.download = download
