import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import "dotenv/config";

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
        url: process.env.QDRANT_URL,
        collectionName,
      }
    );

    //console.log(embeddings);
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
