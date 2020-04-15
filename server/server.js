var express         =         require("express");
var cors            =         require('cors')
var bodyParser      =         require("body-parser");
var app             =         express();
var members         =         require('./routes/members-routes');
var mongoClient     =         require('./mongo/mongo-client')


const router       =        express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4000

app.use('/', router)
app.use('/members', members)

mongoClient.CreateDBAndCollection();

app.listen(PORT,function(){
  console.log(`Server is listening on port ${PORT}`);
})