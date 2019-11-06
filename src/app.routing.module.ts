import { SampleController } from "./controllers/sample/sample.controller";

import { UserController } from "./controllers/users/user.controller";

import { CdsController } from './controllers/cds/cds.controller';

// const passport = require("passport");

// require("./config/passport")(passport);

// import Passport from "passport";

export const routes = [
  {
    controllers: [SampleController, UserController, CdsController],
    middlewares: [],
    path: "",
  },
];
