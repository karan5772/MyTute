import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import "dotenv/config";
import { QdrantClient } from "@qdrant/js-client-rest";
const client = new QdrantClient({
  host: "01759e51-caa2-462f-aa44-7ffb69fccfeb.us-west-2-0.aws.cloud.qdrant.io",
  port: 443,
  https: true,
  apiKey: process.env.QDRANT_API_KEY,
});

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
});

export const chat = async (req, res) => {
  try {
    const { messages } = req.body;
    const userId = req.body.id;

    const collectionName = `MyTute-RAG-${userId}`;

    if (!messages) {
      return res.status(400).json({
        success: false,
        message: "Messages not provided",
      });
    }
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        client,
        collectionName,
      },
    );

    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content;
    const vectorReterever = vectorStore.asRetriever({
      k: 5,
    });
    const vectorSearch = await vectorReterever.invoke(query);

    const SYSTEM_PROMPT = `
  You are an AI assiistent in the rag pipeline, your basic work is to analise the context thet is given to you.
  You have to give resopnse as you are talking to the user itself, so do not mention any of it. 
  You should only answer as per the context nnothing more and if you do not find anything releated, then use your own context.
  Also consider that this is a rag application for a tutor, so explain everything like you are a teacher in one go.
  You always answer in english langauge only.
  
  CONTEXT : ${JSON.stringify(vectorSearch)}`;

    const result = streamText({
      model: groq("openai/gpt-oss-20b"),
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    const reader = result.textStream.getReader();

    // For streaming, done will be false till the EOS
    while (true) {
      const { done, value } = await reader.read();
      console.log("SERVER CHUNK:", JSON.stringify(value));
      if (done) {
        res.end();
        break;
      }
      res.write(value);
    }
  } catch (error) {
    console.error("Chat error:", error);
    console.error("Chat error:", error);
    return res.status(500).json({
      success: false,
      message: "Error generating response",
      error,
    });
  }
};
