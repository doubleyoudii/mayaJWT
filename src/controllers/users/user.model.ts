import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate";

const UserSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(paginate);

export default model("User", UserSchema);
