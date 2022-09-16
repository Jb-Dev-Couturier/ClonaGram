import  SanityClient  from "@sanity/client";
import dotenv from 'dotenv'
dotenv.config()

export default SanityClient({
  projectId: 'r5gc1w1f',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-09-01',
  token: process.env.SANITY_API_TOKEN,
});