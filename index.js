var express = require('express');
require('dotenv').config()
var app = express();

app.get('/',function(req,res){
    res.send('hello, this is just a backend')
})




const port = process.env.PORT || 3000;
app.listen(port, function() {
    
    console.log('Your app is listening on port \n' +'http://localhost:'+port)
});