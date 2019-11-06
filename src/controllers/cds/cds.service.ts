import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class CdsServices {
  @Models("cds") model: any;

  async getDataID (body:any) {
    const {id, title, slug, date, author, category,content, status, type} = body;

    let wpData = {
      id,
      title: title.rendered,
      slug,
      date,
      author,
      category,
      content: content.rendered,
      status,
      type
    }

    const newWpData = await this.model.create(wpData);
    return{ status: 200, message: "Get posts per ID successfully", data: newWpData, meta: {}}

  }

  // getCds() {
  //   // Your logic here
  //   console.log(this.model);
  //   console.log("This is from CdsServices.");
  // }
}
