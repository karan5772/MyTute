import { QdrantClient } from "@qdrant/js-client-rest";
import "dotenv/config";

console.log(process.env.QDRANT_API_KEY);

const client = new QdrantClient({
  host: "01759e51-caa2-462f-aa44-7ffb69fccfeb.us-west-2-0.aws.cloud.qdrant.io",
  port: 443,
  https: true,
  apiKey: process.env.QDRANT_API_KEY,
});

const collections = await client.getCollections();
console.log(collections);
