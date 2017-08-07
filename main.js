const express = require('express')
const data = require('./data')
const mustacheExpress = require('mustache-express')

const app = express()
app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', './templates')

app.get('/', (req, res) => {
  res.render('home', data)
})

app.get('/info/:id', (req, res) => {
  let id = req.params.id
  id = parseInt(id)
  res.render('info', data.users[id - 1])
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
