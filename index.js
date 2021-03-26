// const { json } = require('express')

const express = require('express');

const app = express();

const dataService = require('./services/data.service')

// const app = express();

app.use(express.json());

app.get('/',(req,res)=>{

    res.status(401).send("GET METHOD")
})

app.post('/',(req,res)=>{

    res.send("POST METHOD")
})

app.post('/register',(req,res)=>{
    console.log(req.body);
    const result = dataService.register(req.body.accno,req.body.username,req.body.password)
    console.log(res.send(result.message));
})
app.post('/login',(req,res)=>{
    console.log(req.body);
    const result = dataService.login(req.body.accno,req.body.pswd)
    console.log(res.send(result.message));
})


app.put('/',(req,res)=>{

    res.send("PUT METHOD")
})

app.patch('/',(req,res)=>{

    res.send("PATCH METHOD")
})

app.delete('/',(req,res)=>{

    res.send("DELETE METHOD")
})

app.listen(3000,()=>{
console.log("server started at port 3000");
})

