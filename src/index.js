const server = require('./server.js')
// server port
const port = process.env.PORT || 3000

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

startServer()