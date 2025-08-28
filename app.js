const express = require("express");
const path = require("node:path");
const router = require("./routes/router")
require("dotenv").config();


const app = express();

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// serving Static Assets
app.use(express.static(path.join(__dirname, "public")))

app.use("/", router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
});
