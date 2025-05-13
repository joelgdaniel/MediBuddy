import { queryPineconeVectorStore } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";
// import { Message, OpenAIStream, StreamData, StreamingTextResponse } from "ai";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText, Message, StreamData, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;
// export const runtime = 'edge';

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY ?? "",
});

const google = createGoogleGenerativeAI({
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    apiKey: process.env.GEMINI_API_KEY
});

// gemini-1.5-pro-latest
// gemini-1.5-pro-exp-0801
const model = google('models/gemini-1.5-pro-latest', {
    safetySettings: [
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ],
});

export async function POST(req: Request, res: Response) {
    const reqBody = await req.json();
    console.log(reqBody);

    const messages: Message[] = reqBody.messages;
    const userQuestion = `${messages[messages.length - 1].content}`;

    const reportData: string = reqBody.data.reportData;
    const query = `Analyze this legal document for relevant legal principles and clauses: \n${reportData}. \n\n${userQuestion}`;

    const retrievals = await queryPineconeVectorStore(pinecone, 'index-two', "legalspace", query);

    const finalPrompt = `You are a legal assistant AI. Here is a legal document and a user query, along with some relevant legal context. Please analyze the document and provide a professional response.

  \n\n**Legal Document Analysis:** \n${reportData}
  \n**End of Legal Document** 

  \n\n**User Query:**\n${userQuestion}
  \n**End of User Query** 

  \n\n**Relevant Legal Context:**
  \n${retrievals}
  \n**End of Legal Context** 

  Please structure your response as follows:

  1. DOCUMENT SUMMARY:
  - Provide a brief (2-3 sentences) summary of the key points from the legal document
  - Highlight any particularly important clauses or terms

  2. ANALYSIS:
  - Address the user's specific question
  - Reference relevant parts of the document
  - Cite applicable legal principles from the provided context
  - Explain any potential implications or considerations

  3. RECOMMENDATIONS:
  - Suggest next steps or actions if applicable
  - Highlight any important deadlines or time-sensitive matters
  - Note any areas where professional legal counsel may be needed

  Remember:
  - Use clear, professional language
  - Be specific when referencing the document
  - Make clear distinctions between general legal principles and document-specific details
  - Include appropriate disclaimers about not providing formal legal advice

  \n\n**Response:**
  `;

    const data = new StreamData();
    data.append({
        retrievals: retrievals
    });

    const result = await streamText({
        model: model,
        prompt: finalPrompt,
        onFinish() {
            data.close();
        }
    });

    return result.toDataStreamResponse({ data });
}
