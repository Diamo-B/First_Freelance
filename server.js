const express = require('express');
const next = require('next');

const path = require('path');

const dev = true

const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const server = express();

    server.use(express.static(path.join(__dirname, '/public')))
    server.use('/_next', express.static(path.join(__dirname, '/.next')))

    server.get('/testImages/:id', (req, res) => {
        const actualPage = '/testImages'
        const queryParams = { id: req.params.id } 
        app.render(req, res, actualPage, queryParams)
    })
        
    server.all('*',(req,res) => {
        return handle(req,res);
    })


    server.listen(3000, (err)=>{
        if(err)
            throw err;
        console.log("server ready at port 3000!!");
    })
})