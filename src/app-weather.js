const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast')

const app=express();
const publicDirectoryPath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials') //path for partails

app.set('view engine','hbs')  
app.set('views',viewpath)


hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))  

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Taniya'

    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me page!!!',
        name:'Taniya'
    })
})

app.get('/help',(req,res) =>
{
    res.render('help',{
        title:'Help Page!!',
        name:'Taniya'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return  res.send({
          error:"Please provide a address!!"
        })
        
    }
    geocode(req.query.address, (error,data) =>
    {
        if(error)
        {
            return res.send({error})
        }
        forecast(data.lattitude ,data.longitude ,(error,forecastData) =>
        {
            if(error)
            {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location:data.location,
                address:req.query.address
            })
        })
    })
})

// app.get('/product',(req,res) =>
// {
//     if(!req.query.search)
//     {
//        return  res.send({
//           error:"Please provide a search string!!"
//         })
        
//     }
//     console.log(req.query) 
//     res.send({
//         products:[req.query.search]
//     })

// })

app.get('/help/*',(req,res) =>
{
   res.render('error',{
    title:'error',
    name:'taniya',
    description:'help article not found!!'
})
})

app.get('*',(req,res) =>
{
    res.render('error', {
        title:'error',
        description:'Page not found!!',
        name:'Taniya Thomas'
})
})


app.listen(3000,()=>{
    console.log("server is up on port 3000!!!")
})