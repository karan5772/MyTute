import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import "dotenv/config";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
});

export const ytupload = async (req, res) => {
  try {
    const url = req.body.url;
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Url not provided",
      });
    }

    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });

    const docs = await loader.load();

    // const textSplitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 7000,
    //   chunkOverlap: 200,
    // });

    // const splitDocs = await textSplitter.splitDocuments(docs);

    // const vectorStore = await QdrantVectorStore.fromDocuments(
    //   splitDocs,
    //   embeddings,
    //   {
    //     url: process.env.QDRANT_URL,
    //     collectionName: "MyTute-RAG",
    //   }
    // );

    const title = docs[0].metadata.title;

    return res.status(200).json({
      success: true,
      message: "Youtybe video processed & embedded without saving!",
      title,
    });
  } catch (error) {
    console.log(`Error processing video : ${error}`);
    return res.status(401).json({
      success: false,
      message: "Error processing video ",
    });
  }
};
