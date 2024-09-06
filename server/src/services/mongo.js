import mongoose from 'mongoose';

const MONGO_URL = 'mongodb+srv://hannaworkaccout:34274TXruB5jaEnD@nasacluster.3kjv2vd.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});

export const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
}

export const mongoDisconnect = async () => {
  await mongoose.disconnect();
}