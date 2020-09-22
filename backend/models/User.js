import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.statics.createUser = async function (
  firstName,
  lastName,
  email,
  password
) {
  try {
    const user = await this.create({
      firstName,
      lastName,
      email,
      password,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserByEmail = async function (email) {
  try {
    const user = await this.findOne({ email }).select('+password');
    if (!user) throw { error: 'No user with this e-mail found' };
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserByName = async function (char) {
  console.log(char);
  try {
    const user = await this.find({ firstName: { $regex: char } });
    if (!user) throw { error: 'No users found' };
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw { error: 'No user with this id found' };
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.deleteUserById = async function (id) {
  try {
    const result = await this.deleteOne({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model('User', userSchema);
