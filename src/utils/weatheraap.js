const geocode=require('./utils/utils')
const forecast=require('./utils/forecast')
const request = require('request')
const chalk=require('chalk')

const address=process.argv[2];
if(!address)
{
    console.log("please provide address")
}
else{

    geocode(address,(error, {lattitude , longitude , location}) =>
    {
        if(error)
        {
            return console.log(error)
        }
        forecast(lattitude ,longitude ,(error,forecastData) =>
        {
            if(error)
            {
                return console.log(error)
            }

            console.log(location)
            console.log(forecastData)
        })
    })
}