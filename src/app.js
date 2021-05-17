const path = require('path')
const express = require('express')
const hbs = require('hbs')
const utils = require('../utils/geocode')

// console.log(__dirname)
 console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express Configuration
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partitalsPath = path.join(__dirname, '../templates/partials')

// Setup HBS for Express engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partitalsPath)

//Setup Static public directory to  use 
app.use(express.static(publicDirectory))

// to access the Handlebar template -- Setup a new Route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vicki Jeffries'
    })
})
app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Vicki Jeffries'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Vicki Jeffries',
        message: 'You are on the help page..!'
    })
})

// const aboutDirectory = path.join(__dirname,'../public/about.html')
// const helpDirectory = path.join(__dirname,'../public/help.html')
// app.use(express.static(aboutDirectory))
// app.use(express.static(helpDirectory))


//Get the root domain, and add a handler
// app.get('', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
// })

// //app.com/help
// app.get('/help', (req, res) => {
//     res.send()
// })

// //app.com/about
// app.get('/about', (req, res) => {
//     res.send([{creator: 'Vicki'}, {creator: 'Rita'}])
// })


//app.com/weather

// API Calls to our web server
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error:'An address is required.'})
    } 

    utils.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        // console.log('geo output:', latitude, longitude, location)
        if(error) {
            return res.send({error})
        } 
        utils.forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            } 
            
            res.send({
                forecast:  forecastData,
                location,
                address:req.query.address
            })
        })
    })

})

// Example of using Query String to Receive data from Client
// app.get('/products', (req, res) => {
    
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term.'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

// adding more specific help pages
app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404 Help Page',
        name: 'Vicki Jeffries',
        errorMsg: 'Help article not found.'
    })
})

// Custom Wildcard 404 not found
app.get('*', (req, res) => {
    res.render('error404', {
        title: '404 Page',
        name: 'Vicki Jeffries',
        errorMsg: 'My 404 Page not found'
    })
})

// Server is listening on local server Port:3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})