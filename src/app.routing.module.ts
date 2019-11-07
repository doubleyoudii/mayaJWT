

import { UserController } from "./controllers/users/user.controller";

import { CdsController } from './controllers/cds/cds.controller';


export const routes = [
  {
    controllers: [UserController, CdsController],
    middlewares: [],
    path: "",
  },
];
