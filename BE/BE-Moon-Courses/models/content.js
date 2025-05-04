const { Schema, default: mongoose } = require("mongoose");

const contentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    theory: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contents = mongoose.model("Contents", contentSchema);
module.exports = Contents;
