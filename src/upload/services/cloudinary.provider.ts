import { v2 } from 'cloudinary';
// import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return v2.config({
      cloud_name: 'dxrgztsfz',
      api_key: '919355227965342',
      api_secret: '2kNOS_kGBpqmlOjLGEMBm5EG40I',
    });
  },
};
