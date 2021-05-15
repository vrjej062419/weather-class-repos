const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidnJqZWowNjI0MTkiLCJhIjoiY2tvMDdzMzFzMGIzYTJvbWs2NDF6bmpnbyJ9.EvD05nwap7m-ShnUFYHKkw&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        //console.log('utils response', body.features.length)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }else if (body.features.length == 0) {
            callback('Unable to find location, Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

const forecast = (lat, long, fcallback) => {
    const forecastUrl = 'http://api.weatherstack.com/current?access_key=7a3bf720108340af20620a8944471c40&query=' + encodeURIComponent(lat) + ','+ encodeURIComponent(long) + '&units=f'

    request({url: forecastUrl, json: true},(error, {body} = {}) => {
        //console.log('forcast output', body)
        if(error) {
            fcallback("Connection Error!", undefined)
        }else if (body.error){
            fcallback('Unable to find location!, Try another location.', undefined)
        }else {
            fcallback(undefined,  body.current.weather_descriptions  + ' throughout the day. It is currently ' + body.current.temperature  + ' degrees out.  There is currently ' + body.current.precip + ' % chance of rain.')
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast: forecast
}