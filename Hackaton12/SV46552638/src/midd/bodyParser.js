const http = require("http");
const url = require("url");

module.exports = http.createServer((req, res) => {
  const apiOptions = require("./controller.js");
  const urlParse = url.parse(req.url, true);

  console.log(`Request type: ${req.method} | Endpoint: ${urlParse.pathname}`);
  switch (req.method) {
    case "GET":
      if (urlParse.pathname === "/buys") {
        apiOptions.getBuys(req, res);
      } else if (urlParse.pathname === "/buysCompleted") {
        apiOptions.getBuysCompleted(req, res);
      } else if (urlParse.pathname === "/buysUncompleted") {
      apiOptions.getBuysUncompleted(req, res);
      }
      break;
    case "POST":
      if (urlParse.pathname === "/buys") {
        apiOptions.createBuys(req, res);
      }
      break;
    case "PUT":
      apiOptions.updateBuys(req, res);
      break;
    case "DELETE":
      apiOptions.deleteBuys(req, res);
      break;
    default:
      return;
  }
});
