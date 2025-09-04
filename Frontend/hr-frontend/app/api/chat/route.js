// // app/api/chat/route.js
// export async function POST(request) {
//   try {
//     const { message } = await request.json();

//     if (!message) {
//       return new Response(JSON.stringify({ error: "Message is required" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const apiKey = process.env.PERPLEXITY_API_KEY;
//     if (!apiKey) {
//       console.error("Missing Perplexity API key");
//       return new Response(
//         JSON.stringify({ error: "Server configuration error" }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Create HR-focused system message with company policies
//     const systemMessage = {
//       role: "system",
//       content: `You are HR Buddy, a helpful HR assistant for [COMPANY NAME]. You help employees with:

//       COMPANY POLICIES:
//       - Leave Policy: 20 annual leave days, 10 sick days, maternity/paternity leave available
//       - Work From Home Policy: Hybrid work allowed 3 days/week, full remote by manager approval
//       - Asset Policy: Laptops provided within 3 business days, monitors/peripherals on request
//       - Code of Conduct: Professional behavior, no harassment, confidentiality required
//       - Expense Policy: Pre-approval needed for >$100, receipts required within 30 days

//       LEAVE TYPES AVAILABLE:
//       - Annual Leave (20 days)
//       - Sick Leave (10 days)
//       - Personal Leave (5 days)
//       - Maternity/Paternity Leave (12 weeks)
//       - Emergency Leave (case by case)

//       ASSET REQUEST PROCESS:
//       1. Submit request through HR system
//       2. Manager approval required
//       3. IT procurement within 3-5 business days
//       4. Asset tracking number provided

//       Keep responses concise, friendly, and professional. Reference specific company policies when relevant.`,
//     };

//     const userMessage = {
//       role: "user",
//       content: message,
//     };

//     // Use the correct Perplexity API endpoint and format
//     const response = await fetch("https://api.perplexity.ai/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         model: "sonar", // Current Sonar model
//         messages: [systemMessage, userMessage],
//         max_tokens: 500,
//         temperature: 0.3, // Lower temperature for more consistent responses
//         top_p: 0.9,
//         return_citations: false,
//         search_domain_filter: ["hr-policies.com"], // Optional: filter to HR-related domains
//         return_images: false,
//         return_related_questions: false,
//         search_recency_filter: "month", // Get recent HR info
//         top_k: 0,
//         stream: false,
//         presence_penalty: 0,
//         frequency_penalty: 1,
//       }),
//     });

//     const text = await response.text();
//     console.log("Perplexity raw response:", text);
//     console.log("Response status:", response.status);

//     if (!response.ok) {
//       console.error("Perplexity API error:", response.status, text);
//       return new Response(
//         JSON.stringify({
//           error: `Perplexity API error: ${response.status} - ${text}`,
//         }),
//         {
//           status: response.status,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     let data;
//     try {
//       data = JSON.parse(text);
//     } catch (parseError) {
//       console.error("JSON parse error:", parseError, "Raw text:", text);
//       return new Response(
//         JSON.stringify({
//           error: "Invalid response format from Perplexity API",
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     // Extract the response from the OpenAI-compatible format
//     const reply =
//       data?.choices?.[0]?.message?.content || "No response available";

//     return new Response(JSON.stringify({ reply }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Server error:", err);
//     return new Response(
//       JSON.stringify({ error: "Something went wrong on the server" }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   }
// }

// api/chat/route.js
import {
  analyzeHRIntent,
  processHRRequest,
} from "../../../lib/hr-intelligence.js";

// Keep your existing Perplexity setup
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

export async function POST(request) {
  try {
    const { message } = await request.json();

    // Step 1: Analyze if this is an HR-specific request
    const hrIntent = analyzeHRIntent(message);

    console.log(`HR Intent Analysis:`, hrIntent); // Debug log

    // Step 2: If it's a clear HR request (high confidence), handle it directly
    if (hrIntent.confidence > 0.7) {
      const hrResponse = await processHRRequest(
        hrIntent,
        message,
        "john.doe@company.com"
      );

      return Response.json({
        reply: hrResponse.message,
        data: hrResponse.data,
        actions: hrResponse.actions,
        source: "hr_system",
        intent: hrIntent.intent,
        confidence: hrIntent.confidence,
      });
    }

    // Step 3: For general questions, use Perplexity with HR context
    const hrContextPrompt = `You are an HR assistant for a technology company. 
    The user asked: "${message}"
    
    This doesn't appear to be a specific HR workflow request, but please provide helpful information related to workplace topics if relevant.
    
    Available HR services:
    - Leave management (check balance, apply for leave)
    - Policy information (leave, WFH, benefits)
    - Asset requests (laptops, equipment)
    - General workplace support
    
    If this is a general question, answer normally but mention relevant HR services if appropriate.`;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          {
            role: "system",
            content: hrContextPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const aiReply = data.choices[0].message.content;

    return Response.json({
      reply: aiReply,
      source: "perplexity_ai",
      intent: hrIntent.intent,
      confidence: hrIntent.confidence,
      suggestion:
        hrIntent.confidence < 0.7
          ? "Try asking about leave balance, policies, or asset requests for specialized help!"
          : null,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return Response.json(
      {
        reply:
          "I'm having technical difficulties right now. 😅 Try asking about your leave balance, company policies, or equipment requests - I'm great at those!",
        error: error.message,
        source: "error_fallback",
      },
      { status: 500 }
    );
  }
}
