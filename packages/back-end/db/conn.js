import mongoose from 'mongoose';

export const connectMONGO = async () => {
  // console.log(`\nMongoDB Attempt\n URI: ${process.env.MONGO_URI}`.cyan.green);

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`\nMongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`\nError: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default { connectMONGO };
