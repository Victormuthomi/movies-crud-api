const requestBodyParser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);

      body.id = body.id || req.movies.length + 1;

      req.movies.push(body);
      writeToFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not found",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not found", message: "Route not found" }));
  }
};
