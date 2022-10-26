const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Likes", LikeSchema);
