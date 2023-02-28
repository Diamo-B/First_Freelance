const express = require('express')
const next = require('next')
const fs = require('fs')
const path = require('path')

const app = next({dev: false})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Serve static files from the public folder
  server.use(express.static('public'))

  // Handle requests to images in the public folder
  server.get('/public/*', (req, res) => {
    const filePath = path.join(__dirname, 'public', req.params[0])

    // Set cache-control header to allow revalidation
    res.setHeader('cache-control', 'public, max-age=0')

    // Check if file exists
    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        return res.status(404).end()
      }

      // Serve the file
      res.sendFile(filePath)
    })
  })

  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})

