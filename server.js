var express = require('express');
var cors = require('cors');
require('dotenv').config()
var bodyParser=require('body-parser');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

//-------------------------------------------------------------------------------

var file_analyse=function(req,res){
  res.json({"name":req.file.originalname,"type":req.file.mimetype,"size":req.file.size});
};

app.post('/api/fileanalyse',upload.single('upfile'),file_analyse);

//------------------------------------------------------------------------------


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
