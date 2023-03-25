const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid ");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
//
// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

//   user.tokens = user.tokens.concat({ token });
//   await user.save();

//   return token;
// };

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// fire a function before doc saved to db

//// static method to login user
userSchema.statics.login = async function (email, password) {
  // const user = await this.findOne({ email: email });
  const user = await this.findOne({ email: email }).lean();
  //
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    // if (auth) {
    //
    console.log(user, "from this model");
    return user;
    // }
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
