import { QdrantClient } from "@qdrant/js-client-rest";
import "dotenv/config";
const client = new QdrantClient({
  host: "01759e51-caa2-462f-aa44-7ffb69fccfeb.us-west-2-0.aws.cloud.qdrant.io",
  port: 443,
  https: true,
  apiKey: process.env.QDRANT_API_KEY,
});

export const clearEmbedd = async (req, res) => {
  try {
    // const client = new QdrantClient({
    //   url: process.env.QDRANT_URL,
    // });
    const userId = req.body.id;
    const collectionName = `MyTute-RAG-${userId}`;

    await client.deleteCollection(collectionName);

    return res.status(200).json({
      success: true,
      message: "Embeddings cleared (collection deleted)",
    });
  } catch (e) {
    console.error("Error clearing embeddings:", e);
    return res
      .status(500)
      .json({ success: false, message: "Error clearing embeddings" });
  }
};
