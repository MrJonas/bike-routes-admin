import {Pipe, PipeTransform} from '@angular/core';
import { Images } from '../../../../both/collections/images.collection';
import { Meteor } from "meteor/meteor";

@Pipe({
  name: 'displayImage'
})
export class DisplayImagePipe implements PipeTransform {
  transform(id) {
    if (!id) {
      return;
    }

    let imageUrl: string;

    const found = Images.findOne(id)

    if (found) {
        //const path = `ufs/${found.store}/${found._id}/${found.name}`;
        imageUrl = `https://dviraciumarsrutai.lt/api/images/${found._id}`;
    }

    return imageUrl;
  }
}