import { QdrantClient } from "@qdrant/js-client-rest";
import "dotenv/config";

export const clearEmbedd = async (req, res) => {
  try {
    const client = new QdrantClient({
      url: process.env.QDRANT_URL,
    });
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
