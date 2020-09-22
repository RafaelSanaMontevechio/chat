import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    data: Buffer,
    contentType: String,
  },
  {
    timestamps: true,
    collection: 'images',
  }
);

imageSchema.statics.saveImage = async function (userId, data, contentType) {
  try {
    const resp = await this.create({ userId, data, contentType });
    return resp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

imageSchema.statics.getImage = async function (userId) {
  try {
    const image = await this.findOne({ userId });
    return image;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model('Image', imageSchema);
