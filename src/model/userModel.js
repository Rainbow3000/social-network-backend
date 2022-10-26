const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 8,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    avatar: {
      type: String,
      default: "",
    },
    avatarCover:{
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profile: {
      story:{type:String,default:""}, 
      homeTown: { type: String, default: "" },
      school: { type: String, default: "" },
      livePlace: {
        type: String,
        default: "", 
      },
    },
    friends:[String]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", UserSchema);
