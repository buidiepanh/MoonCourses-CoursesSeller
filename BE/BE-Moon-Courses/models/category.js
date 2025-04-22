const { Schema, default: mongoose } = require("mongoose");

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courses: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
    },
  },
  {
    timestamps: true,
  }
);

const Categories = mongoose.model("Categories", categorySchema);
module.exports = Categories;
