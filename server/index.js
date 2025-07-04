const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

require("dotenv").config();

const userRoutes = require("./routes/User");
const projectRoutes = require("./routes/Project");
const ticketRoutes = require("./routes/Ticket");

const app =  new express()
const port = 8000

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connection with DB established successfully");
    })
    .catch((err) => {
        console.log("ERROR CONNECTING WITH DATABASE", err);
    })

app.use(express.json())
app.use(express.urlencoded());
app.use(cors())

app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/project/", projectRoutes);
app.use("/api/v1/ticket/", ticketRoutes);

// app.use("/*", (req, res) => {
//     res.status(404).json({
//         message: "Route not found"
//     });
// });

app.listen(port, ()=> console.log(`server is running ${port}`))