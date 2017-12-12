import { UploadFS } from 'meteor/jalik:ufs';
import { ImagesStore, ThumbsStore} from '../collections/images.collection';

export function upload(data: File): Promise<any> {
  return new Promise((resolve, reject) => {
    // pick from an object only: name, type and size
    const file = {
      name: data.name,
      type: data.type,
      size: data.size,
    };

    const upload = new UploadFS.Uploader({
      data,
      file,
      store: ImagesStore,
      onError: reject,
      onComplete: resolve
    });

    upload.start();
  });
}

export function remove(id) {
  ThumbsStore.getCollection().remove({_id: id});
  ImagesStore.getCollection().remove({_id: id});
}