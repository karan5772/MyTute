import { QdrantClient } from "@qdrant/js-client-rest";
import "dotenv/config";

export const clearEmbedd = async (req, res) => {
  const collection = "MyTute-RAG";

  try {
    const client = new QdrantClient({
      url: process.env.QDRANT_URL,
    });

    await client.deleteCollection(collection);

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
