import { Controller, Delete, Get, Patch, Post, Put } from "@mayajs/core";
import { Request, Response, NextFunction } from "express";
import { CdsServices } from "./cds.service";

import axios from 'axios';
const WPAPI = require('wpapi');
var wp = new WPAPI({ endpoint: 'https://calderaforms.com/wp-json' });

@Controller({
  model: "./cds.model",
  route: "/cds",
})
export class CdsController {
  // Inject SampleServices
  constructor(private services: CdsServices) {}
  

  @Get({ path: "/posts/", middlewares: [] })
  async get(req: Request, res: Response, next: NextFunction) {
    
    // const webURL = 'https://calderaforms.com/wp-json/wp/v2/posts';
    // const wpdata  = await axios.get(webURL);

    // res.send(wpdata.data)


    wp.posts().then(function( data: any ) {
      // do something with the returned posts
      res.json(data);
    }).catch(function( err: any ) {
      // handle error
      res.send(err);
    });

    
    // Do some GET stuff here
    
  }

  @Get({ path: "/posts/:id", middlewares: [] })
  async getID(req: Request, res: Response, next: NextFunction) {
    
    const id = '150814'; //req.params.id
    wp.posts().id(id).then(async (data:any) => {
      const dataPerID = await this.services.getDataID(data);
      // res.json(data);
      res.json(dataPerID);
    }).catch((err: any) => {
      res.send(err);
    });


    // const webURL = `https://calderaforms.com/wp-json/wp/v2/posts/${id}`;
    // const wpdata  = await axios.get(webURL);

    // res.send(wpdata.data)


    
    
  }




  // // This is a GET request equal to "/sample"
  // @Get({ path: "/", middlewares: [] })
  // get(req: Request, res: Response, next: NextFunction): void {
  //   // Use a function on SampleService
  //   this.services.getSamples();

  //   // Do some GET stuff here
  //   res.send("This is a GET request");
  // }

  // // This is a GET request equal to "/sample/:id"
  // @Get({ path: "/:id", middlewares: [] })
  // getId(req: Request, res: Response, next: NextFunction): void {
  //   // Do some GET stuff here
  //   res.send("This is a GET with id request");
  // }

  // // This is a POST request equal to "/sample/:id/:name"
  // @Post({ path: "/:id/:name", middlewares: [] })
  // post(req: Request, res: Response, next: NextFunction): void {
  //   // Do some POST stuff here
  //   res.send("This is a POST request");
  // }

  // // This is a PATCH request equal to "/sample/:id/custom-path"
  // @Patch({ path: "/:id/custom-path", middlewares: [] })
  // patch(req: Request, res: Response, next: NextFunction): void {
  //   // Do some PATCH stuff here
  //   res.send("This is a PATCH request");
  // }

  // // This is a PUT request equal to "/sample/:id"
  // @Put({ path: "/:id", middlewares: [] })
  // put(req: Request, res: Response, next: NextFunction): void {
  //   // Do some PUT stuff here
  //   res.send("This is a PUT request");
  // }

  // // This is a DELETE request equal to "/sample/:id"
  // @Delete({ path: "/:id", middlewares: [] })
  // delete(req: Request, res: Response, next: NextFunction): void {
  //   // Do some DELETE stuff here
  //   res.send("This is a DELETE request");
  // }
}
