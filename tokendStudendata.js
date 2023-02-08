let express = require("express");
let fs = require("fs");
let readline = require("readline-sync");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin",'*');
res.header(
"Access-Control-Allow-Methods",
"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
next();
});
const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
let testServer ="https://repo-8qu2.onrender.com/studentServer";
let axios = require("axios");


let STUDENT={}


app.post("/searchdata",async function (req, res) {
    let body= req.body;
    console.log(body)
    STUDENT=body
 
    try{
          let token = req.header("authorization") ||req.body.headerValue1||req.body.headerValue2||req.body.headerValue3||"dummyvalue";
          if (!token) res.status(401).send("No token found. Provide a valid token");
          else {
          let response=body.method==="GET"?await axios.get(body.url,{ headers: { authorization: token } }):
    body.method==="DELETE"?await axios.delete(body.url,{ headers: { authorization: token } }):
    body.method==="PUT" ?await axios.put(`${body.url}`  , body.body , { headers: { authorization: token } }):
    body.method==="POST" ?
    await axios.post(`${body.url}`,  body.body , { headers: { authorization: token } })
    :""

        console.log("response",response);
        console.log("token",token);
        console.log("token",body.body);
    res.send(JSON.stringify(response.data)) 
    }}
    catch (error) {
        if (error.response) {
        let {status, statusText} = error.response; 
        console.log(status, statusText); 
        res.status(status).send(statusText); } 
        else res.status (404).send(error);
        }
       
    });