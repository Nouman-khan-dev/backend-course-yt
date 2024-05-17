const cookieParser = require("cookie-parser");
const express = require("express");
const bcryptjs = require("bcryptjs");

const app = express();
app.use(cookieParser());

app.get("/", function (req, res) {
  const myPlaintextPassword = "mysecretpassword";
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(myPlaintextPassword, salt);

  console.log("hashed password:", hash);
  res.send(hash);
  bcryptjs.compareSync(
    "mysecretpassword",
    hash,
    function (err, result) {
      console.log(result);
    }
  );
});

app.listen(3000, function () {
  console.log("app is listening on 3000");
});
