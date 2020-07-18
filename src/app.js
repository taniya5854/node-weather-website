const path=require('path')
const express=require('express')
const hbs=require('hbs')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))  //it is used to include other file in express

const app=express();

//setting up path for public and views 
const publicDirectoryPath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials') //path for partails

//the express hbs functionality so that we can reuse our code
//console.log(partialPath)

//setup handlebar engine and view locations
app.set('view engine','hbs')  //it is an express function for including hbs  which take key value pair
app.set('views',viewpath)

//it take the path to the directory where partials live
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))  //this is a express function to use file 

//to use hbs

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
//to show something we use the function of express that is get

// //for home page
// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express</h1>')

// })

// //for help route
// app.get('/help',(req,res)=>
// {
//     res.send([{
//         name:'Taniya'
//     },
// {
//     name:'Akshita ,Saloni'
// }])
// })

// //about route
// app.get('/about',(req,res)=>
// {
//     res.send('<h2>about page!!</h2>')
// })

//weather route
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return  res.send({
          error:"Please provide a address!!"
        })
        
    }
    
    //console.log(req.query) 
    res.send({
        forecast:forecastData,
        location:location,
        address : req.query.address,
    })
})

app.get('/product',(req,res) =>
{
    if(!req.query.search)
    {
       return  res.send({
          error:"Please provide a search string!!"
        })
        
    }
    console.log(req.query) 
    res.send({
        products:[req.query.search]
    })

})


// this are for error page
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