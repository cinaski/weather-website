const request=require("request");

const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=ad9e20dc5456fef200c88a45937c438a&query="+latitude+","+longitude+"&units=f";

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to find the web service", undefined);
        }else if(body.error){
            callback("Unable to find the location",undefined);

        }else{
            callback(undefined,
   "the current temperature is "+body.current.temperature+" but it feels like "+body.current.feelslike
            )
        }

    })

}

module.exports=forecast;