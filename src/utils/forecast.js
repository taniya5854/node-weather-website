const request=require('request')




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
            callback(undefined,response.body.current.weather_descriptions[0]+"...It is "+ response.body.current.temperature +" degrees out. There is a "+ response.body.current.precip+"% chance of rain and it feels like "+ response.body.current.feelslike+" degree out there and the humidity is:" + response.body.current.humidity +"%.")
        }
    }
    )
}

module.exports=forecast