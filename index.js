// const { json } = require('express')

const express = require('express');

const session = require('express-session');

const cors = require('cors');

const app = express();

const dataService = require('./services/data.service')

app.use(cors({
    origin:"http://localhost:4200",
    credentials:true


}))

app.use(session({

    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false

}))

const logMiddleware = (req, res, next) => {
    console.log(req.body);
    next()

}

app.use(logMiddleware);

const authMiddleware = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.json({
            status: false,
            statusCode: 422,
            message: "Please login"
        })

    }
    else {

        next()
    }




}

// const app = express();
// app.use((req,res,next)=>{
// console.log("middleware")
// next()

// })
app.use(express.json());

app.get('/', (req, res) => {

    res.status(401).send("GET METHOD")
})

app.post('/', (req, res) => {

    res.send("POST METHOD")
})

app.post('/register', (req, res) => {
    // console.log(req.body);
    dataService.register(req.body.accno, req.body.username, req.body.password)
        // console.log(res.send(result.message));
        // res.status(result.statusCode)
        .then(result => {

            res.status(result.statusCode).json(result)          //using mongodb serverconnection
        })
    // console.log(res.status(result.statusCode).json(result));
})
app.post('/login', (req, res) => {
    // console.log(req.body);
    dataService.login(req, req.body.accno, req.body.pswd)
        // console.log(res.send(result.message));
        .then(result => {

            res.status(result.statusCode).json(result)
        })
})
app.post('/deposit', authMiddleware, (req, res) => {      //using middle ware
    // console.log(req.session.currentUser);          //session api datasharing
            dataService.deposit(req.body.accno, req.body.amount, req.body.pswd)
    // console.log(res.send(result.message));
    .then(result => {
            res.status(result.statusCode).json(result)
})

})
app.post('/withdraw', authMiddleware, (req, res) => {
    // console.log(req.session.currentUser);            
 dataService.withdraw(req.body.accno, req.body.amount, req.body.pswd)
    // console.log(res.send(result.message));
    .then(result => {
    res.status(result.statusCode).json(result)


})


})


app.put('/', (req, res) => {

    res.send("PUT METHOD")
})

app.patch('/', (req, res) => {

    res.send("PATCH METHOD")
})

app.delete('/', (req, res) => {

    res.send("DELETE METHOD")
})

app.listen(3000, () => {
    console.log("server started at port 3000");
})

