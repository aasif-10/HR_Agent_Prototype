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

//     // Create HR-focused system message
//     const systemMessage = {
//       role: "system",
//       content: `You are HR Buddy, a helpful HR assistant. You help employees with:
//       - Leave applications and policies
//       - Company policies and procedures
//       - Asset requests (laptops, equipment)
//       - Onboarding questions
//       - General workplace support

//       Keep responses concise, friendly, and professional. If you need more information to help, ask specific follow-up questions.`,
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

// app/api/chat/route.js
export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) {
      console.error("Missing Perplexity API key");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create HR-focused system message with company policies
    const systemMessage = {
      role: "system",
      content: `You are HR Buddy, a helpful HR assistant for [COMPANY NAME]. You help employees with:
      
      COMPANY POLICIES:
      - Leave Policy: 20 annual leave days, 10 sick days, maternity/paternity leave available
      - Work From Home Policy: Hybrid work allowed 3 days/week, full remote by manager approval
      - Asset Policy: Laptops provided within 3 business days, monitors/peripherals on request
      - Code of Conduct: Professional behavior, no harassment, confidentiality required
      - Expense Policy: Pre-approval needed for >$100, receipts required within 30 days
      
      LEAVE TYPES AVAILABLE:
      - Annual Leave (20 days)
      - Sick Leave (10 days) 
      - Personal Leave (5 days)
      - Maternity/Paternity Leave (12 weeks)
      - Emergency Leave (case by case)
      
      ASSET REQUEST PROCESS:
      1. Submit request through HR system
      2. Manager approval required
      3. IT procurement within 3-5 business days
      4. Asset tracking number provided
      
      Keep responses concise, friendly, and professional. Reference specific company policies when relevant.`,
    };

    const userMessage = {
      role: "user",
      content: message,
    };

    // Use the correct Perplexity API endpoint and format
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "sonar", // Current Sonar model
        messages: [systemMessage, userMessage],
        max_tokens: 500,
        temperature: 0.3, // Lower temperature for more consistent responses
        top_p: 0.9,
        return_citations: false,
        search_domain_filter: ["hr-policies.com"], // Optional: filter to HR-related domains
        return_images: false,
        return_related_questions: false,
        search_recency_filter: "month", // Get recent HR info
        top_k: 0,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1,
      }),
    });

    const text = await response.text();
    console.log("Perplexity raw response:", text);
    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Perplexity API error:", response.status, text);
      return new Response(
        JSON.stringify({
          error: `Perplexity API error: ${response.status} - ${text}`,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Raw text:", text);
      return new Response(
        JSON.stringify({
          error: "Invalid response format from Perplexity API",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Extract the response from the OpenAI-compatible format
    const reply =
      data?.choices?.[0]?.message?.content || "No response available";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong on the server" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
