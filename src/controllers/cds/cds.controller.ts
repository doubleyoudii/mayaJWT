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

    
  }


}
