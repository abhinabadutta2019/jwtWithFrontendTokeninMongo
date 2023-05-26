const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");
const dotenv = require("dotenv");

const app = express();

// middleware
dotenv.config();
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

//mongoDB cloud
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/try-2-net-Ninja-JWT-EJS-?retryWrites=true&w=majority`;
//
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// view engine
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => res.render("home.ejs"));

//middleware ekhan theke add hocche
//protected by jwt( here requireAuth() middleware)
app.get("/details", requireAuth, (req, res) => res.render("details.ejs"));

//routes app.use
app.use(authRoutes);

//
//server listener
const PORT = 3013;
app.listen(PORT, console.log("Server start for port: " + PORT));

// // database connection
// const dbURI = "mongodb://127.0.0.1:27017/15th-March";
// mongoose
//   .connect(dbURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));
