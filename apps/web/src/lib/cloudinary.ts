import base from 'axios';

const cloudinary = base.create({
  baseURL: 'https://api.cloudinary.com/v1_1',
});

export default cloudinary;
