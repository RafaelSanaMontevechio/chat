import express from 'express';
import multer from 'multer';

import user from '../controllers/user.js';
import image from '../controllers/image.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router
  .get('/', user.onGetAllUsers)
  .post('/create', user.onCreateUser)
  .get('/find/:char', user.onGetUserByName)
  .get('/:id', user.onGetUserById)
  .post('/upload-image', upload.single('image'), image.onSaveImage)
  .get('/get-image/:userId', image.onGetImage)
  .delete('/:id', user.onDeleteUserById);

export default router;
