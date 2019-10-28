import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";




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
          password: body.password
        }

        // bcrypt.genSalt(10, (err: any, salt: any) => {
        //   bcrypt.hash(reguser.password, salt, (err: any, hash: any) => {
        //     if (err) throw err;
        //     reguser.password = hash;
        //     // newUser
        //     //   .save()
        //     //   .then(user => res.json(user))
        //     //   .catch(err => console.log(err));
        //   });
        // });

        const newlyRegister = await this.model.create(reguser);
        return {status: 200, message: "Register Succesfully", data: newlyRegister, meta: {}}

      }
    } catch (error) {
      return { status: 404, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }

    // Your logic here
    
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



      
      // let reguser = {
      //   name: body.name,
      //   email: body.email,
      //   password: body.password
      // }

      // const isMatch = await bcrypt.compare(body.password, partialUser.password);
      // if (isMatch) {
      //   // User matched
      //   // Create JWT Payload
      //   const payload = {
      //     id: partialUser.id,
      //     name: partialUser.name
      //   };

      //   // Sign token
      //   jwt.sign(
      //     payload,
      //     keys.secretOrKey,
      //     {
      //       expiresIn: 31556926 // 1 year in seconds
      //     },
      //     (err: any, token: any) => {
      //       return {
      //         status: 200,
      //         success: true,
      //         token: "Bearer " + token
      //       };
      //     }
      //   );
      // } else {
      //   return {
      //     status: 401,
      //     message: "Passwordd Incorrect"
      //   }
      // }

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
