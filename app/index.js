const fs = require('fs')
const path = require('path')
const basicauth = require('basic-auth')

module.exports = (req, res) => {
  const credentials = basicauth(req)

  if (!credentials || credentials.pass !== `${credentials.name}1`) {
    res.writeHead(401, { 'WWW-Authenticate': 'Basic' })
    res.end('Restricted area. Please login (admin:admin).')
  }

  const content = fs.readFileSync(path.join(__dirname, 'index.html'))

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(content, 'utf-8')
}
