import mongoose from 'mongoose';

export async function connect() {
  const uri: any = process.env.DB_URL;

  try {
    await mongoose
      .connect(uri)
      .then(() => console.log('Database Connected'))
      .catch((err) => console.log('DataBase Error Occured: ', err));
  } catch (e) {
    console.log('Mongoose Error: ', e);
  }
}
