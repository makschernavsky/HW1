const express = require('express')
const path = require('path')
const { db } = require('./DB')

const PORT = 3000

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src', 'views'))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const usersQuery = req.query
  let imgForRender = db.images

  if (usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false) {
    imgForRender = db.images.slice(0, usersQuery.limit)
  }

  if (usersQuery.reverse === 'true') {
    imgForRender = db.images.slice().reverse()
  }

  if (usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false && usersQuery.reverse === 'true') {
    imgForRender = db.images.slice().reverse().slice(0, usersQuery.limit)
  }

  res.render('main', { srcOfImg: imgForRender })
})

app.post('/addphoto', (req, res) => {
  const dataFromForm = req.body

  db.images.push(dataFromForm)

  res.redirect('/')
})

app.get('*', (req, res) => {
  res.render('404')
})

app.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`)
})
