const express = require('express')
const pg = require('pg-promise')()
const db = pg('postgres://localhost:5432/robots')
const mustacheExpress = require('mustache-express')

// $ CREATE TABLE robots (
//    "id" SERIAL PRIMARY KEY,
//    "username" text,
//    "email" text,
//    "university" text,
//    "street_number" integer,
//    "address" text,
//    "city" text,
//    "state" text,
//    "job" text,
//    "company" text,
//    "postal_code" integer,
//    "year_built" integer,
//    "next_service_date" text,
//    "is_active" boolean
// );

const app = express()
app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.get('/', (req, res) => {
  console.log('res')
  db.any('select * from robots').then(robots => {
    res.render('home', { robots: robots })
  })
})

app.get('/info/:id', (req, res) => {
  let robotId = parseInt(req.params.id)
  db.oneOrNone('SELECT * FROM robots WHERE id = $1', [robotId]).then(robots => {
    res.render('info', { robots: robots })
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
