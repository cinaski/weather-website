const path=require("path");
const express=require("express");
const hbs=require("hbs");
const geoCode=require("./utils/geocode");
const forecast=require("./utils/forecast");

console.log(__dirname);

//define the path for servers
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials")


console.log(publicDirectoryPath);

const app=express();
const port=process.env.PORT || 3000;

app.set("views",viewsPath);
app.set("view engine","hbs");

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));

app.get("",(req,res)=>{
    res.render("index",{
        title:"weather",
        author:"Senthil"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"ABout",
        author:"Senthil"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"help",
        author:"Senthil"
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
        })
    }
    const location=req.query.address;
   geoCode(location,(error,{latitude,longitude,placename}={})=>{
        if(error){
            return res.send({error:"You must provide an addresss"})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
               return res.send({error:error});
            }
            
            return res.send({
                forecastData,
                location,
                address:req.query.address

            })
        })


    })
    // console.log(data);

    // res.send([{
    //     location:"ambattur",
    //     forecast:"sunny",
    //     address:req.query.address
    // }])
})
//app.com
//app.com/help
//app.com/about
app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"There is an error message"
        })
            }
res.send({
    products:[]
})
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404 error",
        msg:"help Page not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404 error",
        msg:"Page not fpund"
    })
})

app.listen(port,()=>{
    console.log("Server up and running" + port)
})

