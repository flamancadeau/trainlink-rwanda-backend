import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: any, file: any) => {
    const fileNameParts = file.originalname.split('.');
    const fileExtension = fileNameParts.length > 1 ? `.${fileNameParts.pop()}` : '';
    const fileName = fileNameParts.join('.');

    return {
      folder: req.body.folder || 'internship-platform',
      resource_type: 'raw',
      allowed_formats: ['pdf', 'jpeg', 'png', 'jpg'],
      public_id: `${fileName}_${Date.now()}${fileExtension}`,
    };
  },
});

export const upload = multer({ storage });