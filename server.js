const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");
const userRoutes = require("./routes/userRoutes")

dotenv.config();
const port = process.env.PORT;

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/apis/recipe", recipeRoutes);
app.use("/apis/user", userRoutes);


app.get("/test", (req, res)=>{
  res.send("Home Page")
})


// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
