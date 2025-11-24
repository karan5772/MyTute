import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import "dotenv/config";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
});

const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url: process.env.QDRANT_URL,
  collectionName: "MyTute-RAG",
});

export const chat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({
        success: false,
        message: "Messages not provided",
      });
    }

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
  
  CONTEXT : ${JSON.stringify(vectorSearch)}`;

    const result = streamText({
      model: openai("gpt-4.1-nano"),
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    const reader = result.textStream.getReader();

    // For streaming, done will be false till the EOS
    while (true) {
      const { done, value } = await reader.read();
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
