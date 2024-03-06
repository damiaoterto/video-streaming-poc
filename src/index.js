const { createServer } = require('node:http')
const { resolve } = require('node:path')
const { existsSync, createReadStream } = require('node:fs')
const { transcode } = require('./transcode')

const bootstrap = async () => {
  const videoPath = resolve(process.cwd(), 'assets', 'videos', 'forest.mp4')

  const server = createServer((request, response) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
    }

    if (request.method === 'OPTIONS') {
      response.writeHead(204, headers)
      response.end()
      return
    }

    if (!existsSync(videoPath)) {
      response.writeHead(404, {
        'Content-Type': 'application/json',
      })

      response.end(JSON.stringify({ message: 'Video file not found' }))
      return
    }

    response.writeHead(200, {
      ...headers,
      'Content-Type': 'video/mp4',
    })

    const transcoder = transcode(videoPath)

    response.once('close', () => {
      transcoder.close()
    })

    transcoder.stream().pipe(response)
  })

  server.listen(3000, () => console.log(`Server running on port 3000`))
}
bootstrap()
