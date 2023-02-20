const express = require('express')
const cors = require('cors')
const { connection } = require('./db');
const { postRouter } = require('./routes/Post.routes');
const { userRouter } = require('./routes/User.routes');
const { authenticate } = require('./middlewares/authenticate.middleware');
require("dotenv").config()

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Homepage 🙏")
})

app.use("/users", userRouter);
app.use(authenticate)
app.use("/posts", postRouter)

app.listen(process.env.port, async() => {
    try {
        await connection
        console.log("Connection established");
    } catch (err) {
        console.log(err);
    }
    console.log(`Running on port ${process.env.port}`);
})