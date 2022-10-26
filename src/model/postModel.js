const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default:""
    },
    image: {
      type: String,
      default:""
    },
    likeNumber: {
      type: Number,
      default:0
    },
    commentNumber: {
      type: Number,
      default:0,
    },
    shareNumber: {
      type: Number,
      default: 0,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    time:{
        type:String,
        default:""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Posts", PostSchema);
