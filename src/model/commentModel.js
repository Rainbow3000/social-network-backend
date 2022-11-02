const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    },
    likeNumber: {
      type: Number,
      default: 0,
    },
    parentId: {
      type: String, 
      default:"0"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    time: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", CommentSchema);
