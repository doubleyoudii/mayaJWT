import { SampleController } from "./controllers/sample/sample.controller";

import { UserController } from "./controllers/users/user.controller";

// const passport = require("passport");

// require("./config/passport")(passport);

// import Passport from "passport";

export const routes = [
  {
    controllers: [SampleController, UserController],
    middlewares: [],
    path: "",
  },
];
