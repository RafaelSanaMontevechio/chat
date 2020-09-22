import fs from 'fs';
import path from 'path';

import imageModel from '../models/Image.js';

export default {
  onSaveImage: async (req, res) => {
    try {
      const { userId } = req.body;

      const data = fs.readFileSync(path.join(`uploads/${req.file.filename}`));
      const contentType = req.file.mimetype;

      const resp = await imageModel.saveImage(userId, data, contentType);

      if (resp) {
        fs.unlink(`uploads/${req.file.filename}`, (err) => {
          if (err) throw err;
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }
  },

  onGetImage: async (req, res) => {
    try {
      const { userId } = req.params;
      const image = await imageModel.getImage(userId);
      const emBase64 = image.data.toString('base64');

      let img = {
        _id: image._id,
        userId: image.userId,
        base64: emBase64,
        type: image.contentType,
      };

      res.send({
        img,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error });
    }
  },
};
