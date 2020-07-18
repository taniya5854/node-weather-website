const request=require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)




const forecast = (latitude,longitude,callback) =>
{
    const url='http://api.weatherstack.com/current?access_key=c0916b90f97553b388bccbdb01fb8b70&query='+ latitude+','+longitude +'&units=m'
    request({url:url , json:true},(error,response)=>
    {
        if(error)
        {
            callback('Unable to connect to services',undefined)
        }
        else if(response.body.error)
        {
            callback('Unable yo find the location,Try another search!!',undefined)

        }
        else
        {
            callback(undefined,response.body.current.weather_descriptions[0]+"...It is "+ response.body.current.temperature +" degrees out. There is a "+ response.body.current.precip+"% chance of rain and it feels like "+ response.body.current.feelslike+" degree out there.")
        }
    }
    )
}

module.exports=forecast