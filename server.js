const express = require('express')
const  { resolve, path } = require('path')
const app = express()


app.use('/', express.static(
  resolve(
    __dirname,
    './build'
  )
))

app.route('/*').get(function(req, res) {
  res.sendFile(resolve(__dirname + '/build/index.html'))
})

app.listen(process.env.PORT || 3000, (err) => {
  if(err) {
    return console.log(err)
  }
  return console.log('Server is Running')
})
