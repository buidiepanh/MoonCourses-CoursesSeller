const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "USER",
    },
    createdCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        default: [],
      },
    ],
    purchasedCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
