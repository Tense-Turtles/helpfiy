var express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const multer = require('multer')
var fs = require('fs');
// const upload = multer({ dest: './public/temp/uploads/' })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const fleek = require('@fleekhq/fleek-storage-js');
require('dotenv').config()
const apiKey = process.env.FLEEK_API_KEY;
const apiSecret = process.env.FLEEK_API_SECRET;


var app = express();



app.get('/', function (req, res) {
    res.send('hello, this is just a backend. The link for the frontend will be added here soon')
})

app.get('/getDB', function (req, res) {
    async function getDB() {

        const res = await fetch('https://storageapi.fleek.co/1e4f9433-e9a2-4412-a561-9a1ddf54e93c-bucket/alldata.json')

        alldata = await res.json();
        console.log(alldata)

    }
    getDB();
})



const uploadFunction = async (data) => {
    const date = new Date();
    const timestamp = date.getTime();

    const input = {
        apiKey,
        apiSecret,
        key: `file-${timestamp}.txt`,
        data,
    };

    try {
        const result = await fleek.upload(input);
        console.log(result);
    } catch (e) {
        console.log('error', e);
    }
}
const uploadPicFunction = async (data, ContentType) => {
    const date = new Date();
    const timestamp = date.getTime();

    const input = {
        apiKey,
        apiSecret,
        key: `file-${timestamp}.png`,
        data,
        ContentType
    };

    try {
        const result = await fleek.upload(input);
        console.log(result);
    } catch (e) {
        console.log('error', e);
    }
}


app.post('/createComplaint', upload.single('upfile'), (req, res) => {
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const fileSize = req.file.size;
    const theFile = req.file.buffer;
    var userName = req.body.name;
    var userEmail = req.body.email;
    var location = req.body.location;
    var description = req.body.description;


    uploadPicFunction(theFile,fileType);
    uploadFunction(userName);
    uploadFunction(userEmail);
    uploadFunction(location);
    uploadFunction(description);
    

    res.redirect('https://black-hill-6592.on.fleek.co/success.html');
    

})























































const port = process.env.PORT || 3000;
app.listen(port, function () {

    console.log('Your app is listening on port \n' + 'http://localhost:' + port)
});