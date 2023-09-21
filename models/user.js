import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true, 
    required: [true, "Email is required"],
  },
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema); 
export default User;
