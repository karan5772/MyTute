import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import "dotenv/config";
import { OpenAI } from "openai";
const openai = new OpenAI();

export const chat = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(401).json({
        success: false,
        message: "Query not provided",
      });
    }

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: "http://localhost:6333",
        collectionName: "MyTute-RAG",
      }
    );

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

    const messagesDB = []; // messages store kerne ke lie
    messagesDB.push({ role: "system", content: SYSTEM_PROMPT });
    messagesDB.push({ role: "user", content: query });

    const result = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messagesDB,
    });

    const output = result.choices[0].message.content;

    res.status(201).json({
      success: true,
      message: "Output generated Sucessfully",
      response: output,
    });
  } catch (error) {}
};
