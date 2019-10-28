import { Controller, Delete, Get, Patch, Post, Put } from "@mayajs/core";
import { Request, Response, NextFunction } from "express";
import { UserServices } from "./user.service";
import { Check } from "@mayajs/common";

import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

function verifyToken (req: Request, res: Response, next: NextFunction) {
  //Do something in Token
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader!.split(" ");
    const bearerToken = bearer[1];
    req.body.token = bearerToken;
    next();
  } else {
    res.status(403).json({
      message: "Forbidden jutsu"
    })
  }

}

@Controller({
  model: "./user.model",
  route: "/user",
})
export class UserController {
  // Inject SampleServices
  constructor(private services: UserServices) {}

  


  @Post({ path: "/registration",
   middlewares: [
     Check("name").notEmpty().required(),
     Check("email").notEmpty().required().isEmail(),
     Check("password").notEmpty().required().minLength(6),
     Check("password2").notEmpty().required().minLength(6)
   ] })
  async postReg(req: Request, res: Response, next: NextFunction) {
    // Do some POST stuff here
    const newUser = await this.services.postRegisterUser(req.body);

    res.json(newUser);
  }




  @Post({ path: "/login", middlewares: [
    Check("name").notEmpty().required(),
    Check("email").notEmpty().required().isEmail(),
    Check("password").notEmpty().required().minLength(6)
  ] })
  async postLogin(req: Request, res: Response, next: NextFunction) {
    // Do some POST stuff here
    console.log(req.body)
    const user = await this.services.findUserbyEmail(req.body.email);
    console.log(user);
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } 

    //bcryt but for not if else
    if (req.body.password === user.password) {
      const payload = {
        id: user.id,
        name: user.name
      };

      jwt.sign(
        payload,
        "testSecret",
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err: any, token: any) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
    }

    

    // const status = await this.services.postLoginUser(req.body);
    // res.json(status);
  }

  @Post({ path: "/postBlog", middlewares: [
    verifyToken
  ] })
  postBlog(req: Request, res: Response, next: NextFunction): void {
    // Do some POST stuff here
    jwt.verify(req.body.token, "testSecret", (err: any, authData:any) => {
      if (err) {
        res.status(403).json({
          message: "Forbidden"
        })
      } else {
        res.json({
          message: 'Post Created',
          authData
        })
      }
    })
  }




  //Not Included for reference`````````````````````````````````````

  // This is a GET request equal to "/user"
  @Get({ path: "/", middlewares: [] })
  async get(req: Request, res: Response, next: NextFunction) {
    // Use a function on userService
    // await this.services.getUsers();
    // Do some GET stuff here
    res.send("This is a GET request");
  }

  // This is a GET request equal to "/user/:id"
  @Get({ path: "/:id", middlewares: [] })
  getId(req: Request, res: Response, next: NextFunction): void {
    // Do some GET stuff here
    res.send("This is a GET with id request");
  }

  // This is a POST request equal to "/user/:id/:name"
  @Post({ path: "/:id/:name", middlewares: [] })
  post(req: Request, res: Response, next: NextFunction): void {
    // Do some POST stuff here
    res.send("This is a POST request");
  }

  // This is a PATCH request equal to "/user/:id/custom-path"
  @Patch({ path: "/:id/custom-path", middlewares: [] })
  patch(req: Request, res: Response, next: NextFunction): void {
    // Do some PATCH stuff here
    res.send("This is a PATCH request");
  }

  // This is a PUT request equal to "/user/:id"
  @Put({ path: "/:id", middlewares: [] })
  put(req: Request, res: Response, next: NextFunction): void {
    // Do some PUT stuff here
    res.send("This is a PUT request");
  }

  // This is a DELETE request equal to "/user/:id"
  @Delete({ path: "/:id", middlewares: [] })
  delete(req: Request, res: Response, next: NextFunction): void {
    // Do some DELETE stuff here
    res.send("This is a DELETE request");
  }
}
