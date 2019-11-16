const express= require('express')
const path= require('path')
const hbs= require('hbs')
const geocode =require('../utils/geocode')
const forecast =require('../utils/forecast')


const publicDirectoryPath=path.join(__dirname,'../public')
console.log(__dirname)
const app = express()
viewsPath= path.join(__dirname, '../templates/views')
partialsPath= path.join(__dirname, '../templates/partials')
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)
app.set('views',viewsPath);
console.log(path.join(__dirname, '../templates/views'));

app.get('/',(req,res)=>{
    res.render('index',{
        title: "Welcome Page",
        name :'Prashant Singh'
        
    })
})
app.use(express.static(publicDirectoryPath))


app.get('/help',(req,res)=>{
    res.render('help',{
        title : "Help Me",
        name:"Prashant Singh"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : "About Me",
        name :"Prashant Singh"
    })
})
console.log(__dirname+ 'hello');
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error : 'Unable to find location.Try another search.'
        })
    }


    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send(error)
            }
        res.send({

            forecast     : forecastData,
            location     : location,
            address      : req.query.address
            })

        })
    })




    // res.send({
    //     forecast:'sunny now',
    //     location:'boston here boy Prashant Singh',
    //     address :req.query.address
    // })
})
app.get('/products',(req,res)=>{
        
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search'
        })
    }
        res.send({
            products : [1,3,2,2,]
        })

})
app.get('*',(req,res)=>{
    res.render('404',{
        title : "404",
        name :"Prashant Singh",
        errormessage : "Page Not Found !!!!!!"
    })
})


app.listen(5000,()=>{
    console.log("The server is up running on port 5000")
})

