

const request=require('request');

const geocode= (address,callback) =>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidGFuaTU4NTQiLCJhIjoiY2tiYXIwb25nMDhpYjJ5czhmZTRwbGp1eiJ9.GNY3C99SdSPXqsDejH8frw';
    request({url:url, json:true},(error,response) =>
    {
        if(error)
        {
            callback('Unable to connect to servcies!',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find the loaction , Try another search!!',undefined)
        }
        else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })

}

  






module.exports=geocode