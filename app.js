const express = require('express')

const app = express()
const cors = require('cors')

const { find_By_Id } = require('./basics/find_by_id')
const { find_one } = require('./basics/find_one')

app.use(cors())
// headers config
app.use(express.json())
app.options('*', cors()) // enables pre-flight requests before other routes
find_one()

//! indique comment traiter les requetes vers la route /image
/* app.use('/images', express.static(path.join(__dirname, 'images')))

//! Express-rate-limit

app.use('/api/sauces', apiLimiter, sauceRoutes) //! DO NOT FORGET / BEFORE api/sauces
app.use('/api/auth', userRoutes)//! more limitations on route/user.js
//! hit 429 if we hit this route too often */
module.exports = app
