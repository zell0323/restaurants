const express = require('express')
const app = express()
const port = 3000


const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// app.js
// ...
// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })

})


app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  const noResult = '<h1 class="text-center">查無餐廳</h1>'
  if (restaurants.length !== 0) {
    res.render('index', { restaurants: restaurants })
  }
  else {
    res.render('index', { noResult: noResult })
  }
})



// ...

app.listen(port, () => {
  console.log('start listening')
})