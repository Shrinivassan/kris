import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";

const userSchema  = new mongoose.Schema({
  name: {
    type:String,
    required:[true,"Name is required"]
  },
  roles: {
    type: String,
    enum: ["Admin", "Base commander", "Logistics Officer"],
    default: "Logistics Officer"
  },
  email:{
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    bcrypt: true,
    validate:{
        validator:  function(value)
        {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
        },
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
});

userSchema.plugin(bcrypt, {
  rounds: 10,
  passwordField: "password",
});

userSchema.methods.comparePassword = async function (password) {
  return await this.verifyPassword(password);
};

const User = mongoose.model("User", userSchema);
export default User;
