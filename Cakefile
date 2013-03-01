fs = require 'fs'
{exec, spawn} = require 'child_process'
util = require 'util'

coffeeFiles = []
jsFiles = []

countSourceFiles = (dir, callback) ->
  exec 'find ' + dir + ' -type f -name "*.coffee" -or -name "*.js" | wc -l', (err, stdout, stderr) -> callback(+stdout)

compile = (srcFile, dstPath) ->
  exec "coffee -o #{dstPath} -c #{srcFile}", (err, stdout, stderr) ->
    if err or stderr
      util.log "Error compiling #{srcFile}: #{err or stderr}"
    else
      srcPathSplit = srcFile.split('/')
      srcFileName = srcPathSplit[srcPathSplit.length - 1].split('.')[0]
      util.log "Compiled #{srcFile} -> #{dstPath}/#{srcFileName}.js"

copy = (srcFile, dstPath) ->
  exec "mkdir -p #{dstPath}", (err, stdout, stderr) ->
    if err or stderr
      util.log "Error making directory #{dstPath}: #{err or stderr}"
    else
      exec "cp -p #{srcFile} #{dstPath}", (err, stdout, stderr) ->
        if err or stderr
          util.log "Error copying #{srcFile} to #{dstPath}"
        else
          util.log "Copied #{srcFile}"

setupBuild = (srcDir, destDir) ->
  fileCount = 0

  watchAndUpdateFile = (currentSrcFile, currentDstPath, command) ->
    fs.watchFile currentSrcFile, (curr, prev) ->
      if +curr.mtime isnt +prev.mtime
        util.log "Change detected in #{currentSrcFile}"
        command currentSrcFile, currentDstPath

  traverseFileSystem = (currentSrcPath, currentDstPath) ->
    for file in fs.readdirSync currentSrcPath
      do (file) ->
        currentSrcFile = "#{currentSrcPath}/#{file}"
        currentDstFile = "#{currentDstPath}/#{file}"
        stats = fs.statSync currentSrcFile

        if stats.isFile()
          if currentSrcFile.match(/\.coffee$/) and not (currentSrcFile in coffeeFiles)
            coffeeFiles.push currentSrcFile
            compile currentSrcFile, currentDstPath
            jsFile = "#{currentDstFile.split('.')[0]}.js"
            jsFiles.push jsFile
            watchAndUpdateFile(currentSrcFile, currentDstPath, compile)
          else if currentSrcFile.match(/\.js$/) and not (currentSrcFile in jsFiles)
            jsFiles.push currentSrcFile
            copy currentSrcFile, currentDstPath
            watchAndUpdateFile(currentSrcFile, currentDstPath, copy)
        else if stats.isDirectory()
          traverseFileSystem currentSrcFile, currentDstFile

  traverseFileSystem srcDir, destDir
  countSourceFiles srcDir, (num) ->
    numSourceFiles = num
    interval = setInterval (-> countSourceFiles(srcDir, (num) ->
      if num > numSourceFiles
        console.log 'here'
        numSourceFiles = num
        clearInterval interval
        traverseFileSystem srcDir, destDir
    )), 1000

task 'build', 'compile src/ and tests/ directories and watch for changes', (options) ->
  util.log 'Building...'
  setupBuild 'src', 'lib'
  setupBuild 'tests/src', 'tests'

task 'docs', 'compile docs using docco', ->
  util.log 'Compiling docs to docs/ dir...'
  exec 'docco src/*.coffee'
