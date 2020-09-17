import makeValidation from '@withvoid/make-validation';
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';

export default {
  onUserLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.getUserByEmail(email);

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send({ error: 'Invalid password' });

      user.password = undefined;
      res.send({
        user,
        authorization: req.authToken,
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).json({ success: false, error: error });
    }
  },

  onCreateUser: async (req, res) => {
    try {
      console.log(req.body);
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          firstName: { type: types.string },
          lastName: { type: types.string },
          email: { type: types.string },
          password: { type: types.string },
        },
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { firstName, lastName, email, password, type } = req.body;
      const user = await UserModel.createUser(
        firstName,
        lastName,
        email,
        password
      );
      user.password = undefined;
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  onGetUserByName: async (req, res) => {
    try {
      const users = await UserModel.getUserByName(req.params.char);
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.params.id);
      return res.sendStatus(200).json({ success: true, user });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).json({ success: false, error: error });
    }
  },

  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.sendStatus(500).json({ success: false, error: error });
    }
  },

  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error,
      });
    }
  },
};
