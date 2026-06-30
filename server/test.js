import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';

const uri = "mongodb+srv://FitMe-User:FitMe12345@cluster0.z80skfo.mongodb.net/fitme?retryWrites=true&w=majority&appName=Cluster0";

console.log("Connecting to:", uri);

mongoose.connect(uri)
  .then(() => console.log('Connected!'))
  .catch(err => console.log('Full Error:', err));