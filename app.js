const express = require("express");
const path = require("node:path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3001;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log("App up and running")
});