const http = require("http"); //first import htpp
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const deleteReq = require("./methods/delete-request");
const putReq = require("./methods/put-request");

let movies = require("./data/movies.json");
//equire("dotenv").config(); //configure to require the dotenv

//declare the port the server to use
const PORT = process.env.PORT || 5001;

//create a server
const server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404; //set the response to status ccode 404
      res.setHeader("content-Type", "application/json"); //set  header to json
      res.write(
        JSON.stringify({ Title: "Not Found", message: "Route not found" })
      ); //swrite the response message
      res.end(); //end the response
  }
});

//listen to the server
server.listen(PORT, () => {
  console.log(`server started on port : ${PORT}`);
});
