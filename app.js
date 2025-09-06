const express = require("express");
const path = require("node:path");
const router = require("./routes/router")
const helmet = require("helmet");
const populateDb = require("./db/populatedb")
require("dotenv").config();


(async () => {
  await populateDb();
})()

const app = express();

app.use(helmet());


// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// serving Static Assets
app.use(express.static(path.join(__dirname, "public")))

app.use("/", router)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
});
