import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import "dotenv/config";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
});

async function fetchOEmbedMeta(url) {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      url
    )}&format=json`;
    const resp = await fetch(oembedUrl, {
      headers: {
        // Helps avoid some region blocks
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    // data: { title, author_name, thumbnail_url, ... }
    return {
      title: data.title,
      author: data.author_name,
      thumbnail: data.thumbnail_url,
    };
  } catch {
    return null;
  }
}

export const ytupload = async (req, res) => {
  try {
    const url = req.body.url;
    const userId = req.body.id;
    const collectionName = `MyTute-RAG-${userId}`;
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

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 7000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(docs);

    const vectorStore = await QdrantVectorStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        url: process.env.QDRANT_URL,
        collectionName,
      }
    );

    const meta = await fetchOEmbedMeta(url);
    const title = meta?.title ?? docs[0]?.metadata?.title ?? "YouTube Video";

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
