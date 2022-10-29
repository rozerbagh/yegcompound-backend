
const fs = require('fs');
const fileUpload = require('express-fileupload');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const crypto = require('crypto');
const bodyParser = require('body-parser');
var path = require('path');
require('dotenv').config();
var cors = require('cors');


const userRoutes = require('./routes/user_route');

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
// Enter copied or downloaded access ID and secret key here
const ID = 'AKIAUGXOU4P7ENYFWUPX';
const SECRET = '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';
const REGION = 'ap-south-1';
// The name of the bucket that you have created
const BUCKET_NAME = 'imageuploading';
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  region: REGION,
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    acl: 'public-read-write',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
}).any();
app.use(upload)


// setting up the cors 
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// middle ware
// app.use(express.static('/public')); //to access the files in public folder
// app.use(cors()); // it enables all cors requests
// app.use(fileUpload());


app.use('/api/v1/user', userRoutes);
app.use(express.static('public'));
app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ extended: true, limit: '150mb' }));
console.log("process.env.DB_HOST", process.env.DB_HOST);

mongoose.connect("mongodb://adminrozerapp:19Vicky93%408050849022@143.244.128.159:27017/lemarchandi?authMechanism=DEFAULT&authSource=admin&readPreference=primary&appname=lemarchnad&directConnection=true&ssl=false", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(res => {
  // console.log(res)
  console.log("mongodb is connected successfully");
}).catch(err => {
  console.log(err);
})

module.exports = app


