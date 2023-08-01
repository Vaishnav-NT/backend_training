import express from "express";

const server = express();

server.get("/*", (req, res) => {
  console.log(req.url);
  res.writeHead(200);
  res.end("Hello world Express TypeScript");
});

server.listen(3000, () => {
  console.log("Server is listening to 3000");
});
