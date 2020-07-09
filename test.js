const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req, res){
  let firstName = req.body.fNAME;
  let lastName = req.body.lNAME;
  let email = req.body.email;

  let data = {
    members: [
      {

        email_address: email,
        status: "subscribed",
        merged_field: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
let jsonData = JSON.stringify(data)

 const url = "https://us10.api.mailchimp.com/3.0/lists/f11799f361";
 const options = {
   method: "POST",
   auth: "AMir:a85f47cc13a8511a205989241261f2f1-us10",
 }

 const request = https.request(url, options, function(response){
 request.on("data", function(data){
   console.log(JSON.parse(data));
 })
})
request.write(jsonData);
request.end();
console.log(statusCode);
})
app.listen(3000, function(){
  console.log("This server is running on 3000")
});
