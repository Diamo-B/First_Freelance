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

    var CronJob = require('cron').CronJob;
    var job = new CronJob(
        '0 0 12 * * 1,3,6', //seconds - mins - hours - dayOfMonth - month - dayOfWeek
        async function() {
            console.log('crontab time every monday,wednesday and saturday at 12:00 am');
            fetch("/api/carts/getCart/allCarts",{
                method:'Get',
                headers:{
                    "Content-Type": "application/json"
                }
            }).then((data)=>{
               data.map((cart)=>{
                    if(cart.Items.length == 0)
                    {
                        fetch("/api/carts/RemoveCart",{
                            method:"DELETE",
                            headers:{
                                "Content-Type" : "application/json"
                            },
                            body:JSON.stringify({
                               Id: cart.Id 
                            })
                        }).then(()=>{
                            console.log("erased the cart "+cart.Id+" for being empty for too long to enlighten the db");
                        })
                    }
               })
            }).catch((err)=>{
                console.log(err);
            })

        },
        null,
        true,
        'Africa/Casablanca'
    );

    server.all('*',(req,res) => {
        return handle(req,res);
    })


    server.listen(3000, (err)=>{
        if(err)
            throw err;
        console.log("server ready at port 3000!!");
    })
})