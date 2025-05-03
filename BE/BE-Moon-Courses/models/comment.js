const { Schema, default: mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;
