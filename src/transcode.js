const { createReadStream } = require('node:fs')
const { spawn } = require('node:child_process')
const ffmpegPath = require('ffmpeg-static')

const transcode = (path) => {
  const ffmpegArgs = [
    '-i', 'pipe:0',
    '-f', 'mp4',
    '-vcodec', 'h264',
    '-acodec', 'aac',
    '-movflags', 'frag_keyframe+empty_moov+default_base_moof',
    '-b:v', '1500K',
    '-maxrate', '1500K',
    '-bufsize', '1000K',
    '-f', 'mp4',
    'pipe:1',
  ]

  const ffmpegExecutable = ffmpegPath || 'ffmpeg'

  const ffmpegProcess = spawn(ffmpegExecutable, ffmpegArgs, {
    stdio: ['pipe', 'pipe', 'pipe']
  })

  createReadStream(path).pipe(ffmpegProcess.stdin)

  ffmpegProcess.stderr.on('data', (msg) => console.error(msg.toString()));

  const stream = () => ffmpegProcess.stdout

  const close = () => {
    ffmpegProcess.stdin.destroy()
    ffmpegProcess.stdout.destroy()
    ffmpegProcess.kill()
  }

  return {
    stream,
    close,
  }
}

module.exports = { transcode }
