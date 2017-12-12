import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { UploadFS } from 'meteor/jalik:ufs';
import { Thumb, Image } from "../models/image.model";

export const Images = new MongoObservable.Collection<Image>('images');
export const Thumbs = new MongoObservable.Collection<Thumb>('thumbs');

function loggedIn() {
    return !!Meteor.user();
}

export const ThumbsStore = new UploadFS.store.GridFS({
  collection: Thumbs.collection,
  name: 'thumbs',
  permissions: new UploadFS.StorePermissions({
        insert(userId, doc) {
            return loggedIn();
        },
        update(userId, doc) {
            return loggedIn();
        },
        remove(userId, doc) {
            return loggedIn();
        }
  }),
  transformWrite(from, to, fileId, file) {
    // Resize to 32x32
    const gm = require('gm');

    gm(from, file.name)
      .resize(32, 32)
      .gravity('Center')
      .extent(32, 32)
      .quality(75)
      .stream()
      .pipe(to);
  }
});

export const ImagesStore = new UploadFS.store.GridFS({
  collection: Images.collection,
  name: 'images',
  filter: new UploadFS.Filter({
    contentTypes: ['image/*']
  }),
  copyTo: [
    ThumbsStore
  ],
  permissions: new UploadFS.StorePermissions({
        insert(userId, doc) {
            return loggedIn();
        },
        update(userId, doc) {
            return loggedIn();
        },
        remove(userId, doc) {
            return loggedIn();
        }
    })
});



Images.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});

Thumbs.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});

