var cloudinary = require('cloudinary').v2;
const keys = require('../config/keys');
const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const Image = require('../models/Image');

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('file');

cloudinary.config({
  cloud_name: keys.cloudinaryCloudName,
  api_key: keys.cloudinaryKey,
  api_secret: keys.cloudinarySecret
});

module.exports = app => {
  app.post('/api/upload_blog_image', multerUploads, (req, res) => {
    console.log(req.query.isHeroImage);
    if (req.file) {
      const dUri = new Datauri();
      const dataUri = req =>
        dUri.format(
          path.extname(req.file.originalname).toString(),
          req.file.buffer
        );
      const imageFile = dataUri(req).content;

      if (req.query.isHeroImage === true) {
        cloudinary.uploader.upload(
          imageFile,
          {
            folder: 'blog_imgs/hero/local/',
            tags: 'local',
            aspect_ratio: '16:9',
            width: 720,
            crop: 'fill'
          },
          (error, image) => {
            if (error) {
              res.send({ error: error.message });
              return;
            } else {
              let newImage = new Image({
                meta: image,
                imageType: 'blogImage',
                caption: req.query.caption,
                source: req.query.source
              });

              newImage.save(function(err) {
                if (err) {
                  res.send({ error: err.message });
                } else {
                  res.send({ uploadedImage: newImage });
                }
              });
            }
          }
        );
      } else {
        cloudinary.uploader.upload(
          imageFile,
          {
            folder: 'blog_imgs/body/local/',
            tags: 'local'
          },
          (error, image) => {
            if (error) {
              res.send({ error: error.message });
              return;
            } else {
              let newImage = new Image({
                meta: image,
                imageType: 'blogImage',
                caption: req.query.caption,
                source: req.query.source
              });

              newImage.save(function(err) {
                if (err) {
                  res.send({ error: err.message });
                } else {
                  res.send({ uploadedImage: newImage });
                }
              });
            }
          }
        );
      }
    }
  });

  app.post('/api/upload_web_blog_image', (req, res) => {
    // console.log(req.body.imageUrl);
    console.log(req.body.isHeroImage);
    const imageUrl = req.body.imageUrl;
    if (req.body.isHeroImage === true) {
      cloudinary.uploader.upload(
        imageUrl,
        {
          folder: 'blog_imgs/hero/web/',
          tags: 'web',
          aspect_ratio: '16:9',
          width: 720,
          crop: 'fill'
        },
        (error, image) => {
          if (error) {
            res.send({ error: error.message });
            return;
          } else {
            let newImage = new Image({
              meta: image,
              imageType: 'blogImage',
              source: req.body.source,
              caption: req.body.caption
            });

            newImage.save(function(err) {
              if (err) {
                res.send({ error: err.message });
              } else {
                res.send({ uploadedImage: newImage });
              }
            });
          }
        }
      );
    } else {
      cloudinary.uploader.upload(
        imageUrl,
        {
          folder: 'blog_imgs/body/web/',
          tags: 'web'
        },
        (error, image) => {
          if (error) {
            res.send({ error: error.message });
            return;
          } else {
            let newImage = new Image({
              meta: image,
              imageType: 'blogImage',
              source: req.body.source,
              caption: req.body.caption
            });

            newImage.save(function(err) {
              if (err) {
                res.send({ error: err.message });
              } else {
                res.send({ uploadedImage: newImage });
              }
            });
          }
        }
      );
    }
  });

  app.delete('/api/delete_blog_image', (req, res) => {
    cloudinary.uploader.destroy(req.query.imagePublicId, (error, result) => {
      // console.log(result, error);
      if (result) {
        Image.findByIdAndDelete(req.query.imageId, err => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });
};
