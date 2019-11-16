const request = require('request')


const forecast =(latitude,longitude,callback)=>{
    const url ='https://api.darksky.net/forecast/0a0cfc65005c0f175f55741ad366d8dc/'+ latitude +','+longitude+'?units=si'

    request({uri : url , json : true},(error,response)=>{
        
        if(error){
            callback('Unable to connect to weather service',undefined)
        } else if(response.body.error){
            callback(undefined,'unable to find location')
        }else{
          callback(undefined,
            response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature + ' degress out there.'+'There is a ' +response.body.currently.precipProbability + '% chance of rain.'
            
            )
        }


    })
}

// forecast(11.1271,78.6569,(error,data)=>{
//     console.log("Error",error)
//     console.log('DATA',data)
// })


module.exports=forecast