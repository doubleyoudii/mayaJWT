import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

import bcrypt from "bcryptjs";



@Injectable()
export class UserServices {
  @Models("user") model: any;

  async postRegisterUser(body: any) {

    try {

      if (body.password !== body.password2) {
        return {status: 401, message: "Passwords should match", data: [], meta: {}}
      }

      const partialUser = await this.model.findOne({email: body.email});
      if (partialUser) {
        return {status: 400, message: "Email already exist", data: [], meta: {}}
      } else {
        let reguser = {
          name: body.name,
          email: body.email,
          password: bcrypt.hashSync(body.password, 10)

        }


        const newlyRegister = await this.model.create(reguser);
        return {status: 200, message: "Register Succesfully", data: newlyRegister, meta: {}}

      }
    } catch (error) {
      return { status: 404, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }

    
  }

  async postLoginUser (body: any) {

    try {
      const partialUser = await this.model.findOne({email: body.email});
      if (!partialUser) {
        return {status: 400, message: "Email not found", data: [], meta: {}}
      }
      
      
      //Test!!!!!!!!111111
      const logInUser = await this.model.create(partialUser);
      return { status: 200, message: "Login Success", data: logInUser, meta: {}}


    } catch (error) {
      return { status: 400, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }


  async findUserbyEmail (email: string) {
    try {
      const userTry = await this.model.findOne({email: email});
      return userTry;
    } catch (error) {
      
    }
  }
}
