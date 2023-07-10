const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const recipeRoute = require("./routes/Recipe");
const cors = require('cors')

const path = require("path");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB Connect"))
  .catch((err) => console.log(err));




app.use(express.static(path.join(__dirname, "../mealer/build")))
/* app.use("/images", express.static(path.join(__dirname, "public/images"))); */



//middleware\
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));

const personStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/person");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const recipeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/recipe");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadPerson = multer({ storage: personStorage });
const uploadRecipe = multer({ storage: recipeStorage });
app.post("/upload", uploadPerson.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.post("/upload/recipe", uploadRecipe.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/recipes", recipeRoute);

app.get("/start", (req, res) => {
  res.status(200).json("hello");
});




app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../mealer/build", "index.html"))
})

app.listen(8800, () => {
  console.log("Backend server is running!");
});
