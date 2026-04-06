
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDNARY_CLOUDNAME, 
  api_key: process.env.CLOUDNARY_APIKEY, 
  api_secret: process.env.CLOUDNARY_SECRET
});


exports.uploadFile = async (fileBuffer) => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (result) {
            console.log("file upload:", result);
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  } catch (err) {
    console.log(err);
  }
};
