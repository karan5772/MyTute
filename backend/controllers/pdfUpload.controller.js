import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import "dotenv/config";
import { QdrantClient } from "@qdrant/js-client-rest";
const client = new QdrantClient({
  host: "01759e51-caa2-462f-aa44-7ffb69fccfeb.us-west-2-0.aws.cloud.qdrant.io",
  port: 443,
  https: true,
  apiKey: process.env.QDRANT_API_KEY,
});

export const pdfUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No PDF uploaded" });
    }
    const userId = req.body.id;
    const collectionName = `MyTute-RAG-${userId}`;

    const pdfBuffer = req.file.buffer;

    const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });

    const loader = new PDFLoader(pdfBlob);
    const docs = await loader.load();

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
    });

    const vectorStore = await QdrantVectorStore.fromDocuments(
      docs,
      embeddings,
      {
        client,
        collectionName,
      },
    );
    return res.status(200).json({
      success: true,
      message: "PDF processed & embedded without saving!",
    });
  } catch (error) {
    console.log(`Error uploading pdf : ${error}`);
    return res.status(401).json({
      success: false,
      message: "Error uploading pdf ",
    });
  }
};
