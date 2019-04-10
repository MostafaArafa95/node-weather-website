const request=require('request');

const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibW9zdGFmYWFyYWZhIiwiYSI6ImNqdTJrbGdiOTA2b28zeWp0amF6aG1wOTUifQ.Svc22YLPSzOyUaMVO8qfjw&limit=1";
    request({url,json:true},(error,response,body)=>{
        if(error){
            callback("Cannot connect to the internet",undefined);
        }else if(body.features.length===0){
            callback("Unable to find location",undefined);
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })

        }
    })

}
module.exports=geocode;