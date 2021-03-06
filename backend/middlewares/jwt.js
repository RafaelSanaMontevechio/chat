import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js';

const SECRET_KEY = 'secretKey';

export const encode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await UserModel.getUserByEmail(email);

    const payload = {
      userId: user._id,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);

    req.authToken = authToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.error });
  }
};

export const decode = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res
      .status(400)
      .json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};
