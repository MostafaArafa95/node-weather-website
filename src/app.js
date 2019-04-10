const path=require("path");
const express=require('express');
const hbs =require('hbs');
const geocode=require('./utils/geocode')
const forecast=require("./utils/forecast")

const app=express();

const PORT_NUM=3000;

//Define paths for express config
const PUBLIC_PATH= path.join(__dirname,'../public');
const VIEWS_PATH=path.join(__dirname,'../templates/views');
const PARTIALS_PATH=path.join(__dirname,'../templates/partials');

//setup handlebars and views location
app.set('view engine','hbs');
app.set('views',VIEWS_PATH);
hbs.registerPartials(PARTIALS_PATH);

//setup static dirctory to serve
app.use(express.static(PUBLIC_PATH));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Andrew'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:"Andrew head"
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        
        
        if(error){
            return res.send({error});
        }
        forecast(longitude,latitude,(error,result)=>{
            if(error){
                res.send({error})
            }else{
                res.send({
                    forecast: result,
                    location,
                    address:req.query.address
                });
            }
        })
    })
    /*
    res.send({
        forecast:"It is snowing",
        location:"Cairo",
        address:req.query.address
    })*/
})

app.get('/products',(req,res)=>{

    if(! req.query.search){
        return res.send({
            error: "You must provide search term"
        })

    }

    console.log(req.query);
    res.send({
        products:[]
    })

})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        helpMessage:"An example help message",
        name:"Andrew head"
    })
})
app.get('/help/*',(req,res)=>{
    res.render("nf_error",{
        title:"Error Page",
        name:"Mr Andrew",
        errorMessage:"Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render("nf_error",{
        title:"Error Page",
        name:"Mr Andrew",
        errorMessage:"Page not found"
    })

})

app.listen(PORT_NUM,()=>{
    console.log("Server is up on port "+PORT_NUM+".");
    

})