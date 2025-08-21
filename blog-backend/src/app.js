const express = require("express");

const postsRouter = require("./routes/postsRouter");
const usersRouter = require("./routes/usersRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
require("dotenv").config();

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

const PORT = parseInt(process.env.BACKEND_PORT);
app.listen(PORT, () => {
    console.log(`Backend now listening on Port ${PORT}`);
})