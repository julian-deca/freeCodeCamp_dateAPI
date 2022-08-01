// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  const myRegex = /[-]/g;
  let time;
  let data;
  myRegex.test(req.params.date)
    ? ((time = req.params.date.split("-")),
      (data = new Date(
        Date.UTC(Number(time[0]), Number(time[1]) - 1, Number(time[2]))
      )))
    : (data = new Date(Date.UTC(Number(req.params.date))));

  res.json({
    unix: data.getTime(),
    utc: data.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
