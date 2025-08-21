const express = require("express");
const path = require("node:path");
require("dotenv").config();

const frontPageRouter = require("./routes/frontPageRouter");
const postPageRouter = require("./routes/postPageRouter")
const loginRouter = require("./routes/loginRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = process.env.READER_PORT || 8080
app.set('port', PORT);

app.use("/", frontPageRouter); 
app.use("/post", postPageRouter); 
app.use("/login", loginRouter);

app.listen(app.get('port'), () => {
    console.log(`Reader now listening on Port ${PORT}`)
})
