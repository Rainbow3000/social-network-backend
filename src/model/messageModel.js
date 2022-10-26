const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    from:{
        type:String, 
        required:true
    },
    to: {
      type:String, 
      required: true,
    }, 
    content:{
        type:String, 
        required:true
    },
    time:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);
