import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate";

const schema = new Schema({
  // name: {
  //   required: [true, "Name is required."],
  //   type: String,
  //   unique: true,
  // },
  id: {
    type: String,
  },
  title: {
    type: String
  },
  slug: {
    type: String
  },
  date: {
    type: String
  },
  author: {
    type: String
  },
  category: {
    type: String
  },
  content: {
    type: String
  },
  status: {
    type: String
  },
  type: {
    type: String
  }
});

schema.plugin(paginate);

export default model("Cds", schema);
