const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("using middleware");
    next();
})

app.use((req, res, next) => {
    console.log("showing ");
    res.send("<h1>Hello</h1>");
})

app.listen(3000);