const
  parseArgv = require('minimist'),
  join = require('path').join,
  EOL = require('os').EOL,
  padRight = (str,l) => {
    while(str.length < l) {
      str += ' '
    }
    return str.substr(0, l)
  },
  isWindows = process.platform === 'win32',
  argv = parseArgv(process.argv, {
    alias: {
      i: 'input',
      o: 'output',
      t: 'temp',
      n: 'name',
      v: 'version',
      p: 'python',
      f: 'flag',
      c: 'configure',
      m: 'make',
      vc: 'vcBuild',
      r: 'resource',
      d: 'download',
      s: 'snapshot',
      b: 'bundle',
      cli: 'enableNodeCli',
      h: 'help',
      l: 'loglevel',
    },
    default: {
      python: null,
      version: process.version.slice(1),
      temp: process.env.NEXE_TEMP || join(process.cwd(), '.nexe'),
      enableNodeCli: false,
      vcBuild: ['nosign', 'release'],
      make: [],
      loglevel: 'info',
      configure: []
    }
  }),
  help =
`
nexe --help              CLI OPTIONS

  -i   --input      =/main/bundle/file.js   -- main js bundle
  -o   --output     =/my/nexe/binary        -- path to output file
  -t   --temp       =/path/for/build/files  -- nexe temp directory (3Gb+) ~ NEXE_TEMP
  -n   --name       =nexe-output.js         -- file name for error reporting at run time
  -v   --version    =${padRight(process.version.slice(1), 23)}-- node version
  -p   --python     =/path/to/python2       -- python executable
  -f   --flag       ="--expose-gc"          -- *v8 flags to include during compilation
  -c   --configure  ="--with-dtrace"        -- *pass arguments to the configure command
  -m   --make       ="--loglevel"           -- *pass arguments to the make command
  -vc  --vcBuild    =x64                    -- *pass arguments to vcbuild.bat
  -r   --resource                           -- *embed file bytes within binary
  -d   --download   =win32-x64-X.X.X        -- use prebuilt binary (url or name)
  -s   --snapshot   =/path/to/snapshot      -- prebuild with snapshot
  -b   --bundle                             -- attempt bundling application
       --clean                              -- force download fresh sources
       --enableNodeCli                      -- enable node cli enforcement (prevents own cli)
       --log-level                          -- silent,info,verbose

                                             * option can be used more than once
`.trim()

function normalize (x) {
  return x
}

if (argv.help) {
  process.stderr.write(EOL + help + EOL, () => process.exit(0))
}

module.exports.normalize = normalize
module.exports.argv = argv
