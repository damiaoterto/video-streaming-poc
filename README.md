# Video Streaming POC
### Description
This project serves as a Proof of Concept (POC) for video streaming using Node.js along with FFmpeg, the HTTP module (native to Node.js), and the child_process module for spawning processes. The primary focus of this POC is not on architectural patterns but rather on showcasing the core functionality of video streaming.

Utilizing the power of Node.js, FFmpeg, and native HTTP modules, this POC demonstrates the capability to efficiently stream video content over the web. Leveraging FFmpeg for encoding and decoding various video formats, the application seamlessly processes video streams while the HTTP module handles the communication between the server and clients.

By incorporating child_process for spawning processes, the project showcases the ability to manage multiple concurrent streams effectively. Through this approach, it ensures a smooth and responsive streaming experience for users accessing the content.

Overall, this POC serves as a foundation for building robust video streaming solutions using Node.js, demonstrating its versatility in handling multimedia tasks efficiently.

### Starting the application

**Install packages:**
```
# using pnpm
pnpm install
```

**Starting server**
```
# using pnpm
pnpm start
```

**Opening client application**

Open the file `index.html` directly in your browser or start a server using [Serve Lib](https://www.npmjs.com/package/serve)
