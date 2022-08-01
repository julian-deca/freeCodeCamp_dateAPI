// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
let a = new Date(2015, 11, 25, 0, 0, 0);
console.log(a);
console.log(a.getTime());

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
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const myRegex = /[-]/g;
  let time;
  let data;
  myRegex.test(req.params.date)
    ? ((time = req.params.date.split("-")),
      (data = new Date(Number(time[0]), Number(time[1]) - 1, Number(time[2]))))
    : (data = new Date(Number(req.params.date)));

  const day = days[data.getUTCDay()];
  const date = data.getUTCDate();
  const month = months[data.getUTCMonth()];
  const year = data.getUTCFullYear();
  const hour =
    data.getUTCHours() < 10 ? "0" + data.getUTCHours() : data.getUTCHours();
  const minutes =
    data.getUTCMinutes() < 10
      ? "0" + data.getUTCMinutes()
      : data.getUTCMinutes();
  const seconds =
    data.getUTCSeconds() < 10
      ? "0" + data.getUTCSeconds()
      : data.getUTCSeconds();

  res.json({
    unix: data.getTime(),
    utc: `${day}, ${date} ${month} ${year} ${hour}:${minutes}:${seconds} GMT`,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
