// "use client";
// import React from "react";
// import { IoIosAdd } from "react-icons/io";
// import { RiResetLeftFill } from "react-icons/ri";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { MdOutlineKeyboardVoice } from "react-icons/md";
// import { LuSend } from "react-icons/lu";
// import { MdTimeToLeave } from "react-icons/md";
// import { MdOutlinePolicy } from "react-icons/md";
// import { IoLaptopOutline } from "react-icons/io5";

// const page = () => {
//   return (
//     <>
//       <div className="main w-full bg-black ">
//         <div className="page1 w-full h-[100vh] bg-black flex flex-row gap-1 rounded-2xl overflow-hidden py-[30px] px-[20px]  ">
//           <div className="page-left w-[15vw] bg-black rounded-t-xl rounded-b-xl ">
//             page
//           </div>

//           <div className="page-right w-[85vw] flex flex-col gap-1">
//             <div className="page1-top  h-[10vh] bg-[#131313] rounded-t-xl flex justify-between items-center px-[40px] py-[5px]">
//               <h2 className="text-[#ccc3c3] font-['PP_Editorial_New'] font-[500] text-[20px]">
//                 HR Buddy
//               </h2>

//               <div className="chat-options flex gap-5 items-center">
//                 <div className="bg-[#2c2c2c] px-[15px] py-[8px] rounded-[8px]">
//                   <h2 className="text-[#868080] font-['Neue_Haas_Grotesk_Display_Pro'] font-[600] flex items-center gap-1">
//                     <span className="text-[16px]">
//                       <IoIosAdd />
//                     </span>
//                     New chat
//                   </h2>
//                 </div>
//                 <div className="">
//                   <h2 className="text-[#6e6868] font-['Neue_Haas_Grotesk_Display_Pro'] font-[600] flex items-center gap-2">
//                     <span className="text-[16px]">
//                       <RiResetLeftFill />
//                     </span>
//                     Clear chat
//                   </h2>
//                 </div>
//               </div>
//             </div>

//             <div className="page1-bottom w-full h-[90vh] bg-[#131313] rounded-b-xl relative ">
//               <div className="page-mid  w-[50vw] h-[50vh] absolute left-[50%] top-[35%] -translate-x-[50%] -translate-y-[50%] pt-20">
//                 <div className="w-full   flex flex-col items-center justify-center gap-10">
//                   <h1 className="font-['PP_Editorial_New'] text-[55px] font-[500]  text-[#dad0d0] leading-[70px] text-center">
//                     Your HR Buddy, your friendly assistant for quick workplace
//                     support
//                   </h1>

//                   <p className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[20px] text-[#9d9292]">
//                     Get instant help anytime with HR Buddy
//                   </p>
//                   <div className=" flex items-center gap-10">
//                     <div className="box1 font-['Neue_Haas_Grotesk_Display_Pro'] bg-[#2b2b2b] px-[11px] py-[7px] rounded-[5px]">
//                       <h2 className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[15px] text-[#b8acac] flex items-center gap-3">
//                         <span className="text-[20px]">
//                           <MdOutlinePolicy />
//                         </span>{" "}
//                         Check Policies
//                       </h2>
//                     </div>
//                     <div className="box2 font-['Neue_Haas_Grotesk_Display_Pro']">
//                       <h2 className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[15px] text-[#b8acac] bg-[#2b2b2b] px-[11px] py-[7px] rounded-[5px] flex items-center gap-3">
//                         <span className="text-[20px]">
//                           <MdTimeToLeave />
//                         </span>
//                         Apply Leave
//                       </h2>
//                     </div>
//                     <div className="box3 font-['Neue_Haas_Grotesk_Display_Pro']">
//                       <h2 className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[15px] text-[#b8acac] bg-[#2b2b2b] px-[11px] py-[7px] rounded-[5px] flex items-center gap-3">
//                         <span className="text-[20px]">
//                           <IoLaptopOutline />
//                         </span>{" "}
//                         Request Asset
//                       </h2>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="chat-input w-full  h-[10vh] absolute bottom-8 flex flex-row items-center gap-3 justify-center">
//                 <div className="doc w-[50px] h-[55px] bg-black rounded-[8px] flex items-center justify-center ">
//                   <span className="text-[#ada6a6] text-[18px]">
//                     <IoDocumentTextOutline />
//                   </span>
//                 </div>
//                 <div className="voice w-[50px] h-[55px] bg-black  rounded-[8px] flex items-center justify-center">
//                   <span className="text-[#ada6a6] text-[18px]">
//                     <MdOutlineKeyboardVoice />
//                   </span>
//                 </div>
//                 <div className="message w-[50vw] h-[55px] bg-black  rounded-[8px] px-[2px] relative flex items-center pl-5">
//                   <h2 className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[#ada6a6]">
//                     Need help with onboarding, leave, or policies?
//                   </h2>
//                   <div className="send w-[48px] h-[45px] bg-[#02febd] mt-[4px] mr-[5px]  rounded-[8px] absolute right-0 flex items-center justify-center">
//                     <span className="text-black text-[18px]">
//                       <LuSend />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";
import { IoDocumentTextOutline, IoLaptopOutline } from "react-icons/io5";
import {
  MdOutlineKeyboardVoice,
  MdTimeToLeave,
  MdOutlinePolicy,
} from "react-icons/md";
import { LuSend } from "react-icons/lu";

const page = () => {
  // --- state ---
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const chatEndRef = useRef(null);

  // --- load saved messages ---
  useEffect(() => {
    const saved = localStorage.getItem("hrbuddy_messages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // --- save messages ---
  useEffect(() => {
    localStorage.setItem("hrbuddy_messages", JSON.stringify(messages));
  }, [messages]);

  // --- auto scroll ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // --- helpers ---
  const addUserMessage = (text) =>
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user" }]);
  const addBotMessage = (text) =>
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "bot" }]);

  const generateBotReply = (userText) => {
    const t = userText.toLowerCase();
    if (t.includes("leave"))
      return "To apply for leave, tell me the start and end dates.";
    if (t.includes("policy") || t.includes("policies"))
      return "Which policy would you like—leave, expenses, or code of conduct?";
    if (t.includes("asset") || t.includes("laptop"))
      return "Tell me what asset you need (example: laptop or monitor).";
    return "Got it — I can help with that. Can you give a bit more detail?";
  };

  const simulateBotReply = (incomingText) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(generateBotReply(incomingText));
    }, 1000 + Math.random() * 1000);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setStarted(true);
    addUserMessage(trimmed);
    setInput("");
    setTimeout(() => simulateBotReply(trimmed), 150);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const sendQuick = (text) => {
    setStarted(true);
    addUserMessage(text);
    setTimeout(() => simulateBotReply(text), 150);
  };

  return (
    <div className="main w-full bg-black">
      <div className="page1 w-full h-[100vh] bg-black flex flex-row gap-1 rounded-2xl overflow-hidden py-[30px] px-[20px]">
        <div className="page-left w-[15vw] bg-black rounded-t-xl rounded-b-xl">
          page
        </div>

        <div className="page-right w-[85vw] flex flex-col gap-1">
          {/* header */}
          <div className="page1-top h-[10vh] bg-[#131313] rounded-t-xl flex justify-between items-center px-[40px] py-[5px]">
            <h2 className="cursor-pointer text-[#ccc3c3] font-['PP_Editorial_New'] font-[500] text-[20px]">
              HR Buddy
            </h2>
            <div className="chat-options flex gap-5 items-center">
              <button
                className="cursor-pointer group bg-[#2c2c2c] px-[15px] py-[8px] rounded-[8px] text-[#868080] hover:bg-[#696766] transition duration-200 font-['Neue_Haas_Grotesk_Display_Pro'] font-[600] flex items-center gap-1"
                onClick={() => {
                  setMessages([]);
                  setStarted(false);
                  localStorage.removeItem("hrbuddy_messages");
                }}
              >
                <IoIosAdd className="text-[16px] group-hover:text-[#151414] transition-colors duration-200" />{" "}
                <span className="group-hover:text-[#151414] transition-colors duration-200">
                  New chat
                </span>
              </button>
              <button
                className="cursor-pointer text-[#6e6868] hover:text-[#d5d5d5] transition duration 200 font-['Neue_Haas_Grotesk_Display_Pro'] font-[600] flex items-center gap-2"
                onClick={() => {
                  setMessages([]);
                  localStorage.removeItem("hrbuddy_messages");
                }}
              >
                <RiResetLeftFill className="text-[16px]" /> Clear chat
              </button>
            </div>
          </div>

          {/* chat area */}
          <div className="page1-bottom w-full h-[90vh] bg-[#131313] rounded-b-xl relative">
            <div
              className="chat-area px-8 pt-8 pb-32 h-[70vh] overflow-y-auto flex flex-col gap-4"
              role="log"
              aria-live="polite"
            >
              {!started && messages.length === 0 ? (
                // Hero before first message
                <div
                  className="page-mid w-[52vw] flex flex-col items-center justify-center gap-10 absolute left-[50%]
                top-[42%] -translate-x-[50%] -translate-y-[50%]"
                >
                  <h1 className="font-['PP_Editorial_New'] text-[42px] sm:text-[55px] font-[500] text-[#dad0d0] leading-[1.05] text-center">
                    Your HR Buddy, your friendly assistant for quick workplace
                    support
                  </h1>
                  <p className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[18px] text-[#9d9292]">
                    Get instant help anytime with HR Buddy
                  </p>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => sendQuick("Show me the policies")}
                      className="cursor-pointer group box1 font-['Neue_Haas_Grotesk_Display_Pro'] bg-[#2b2b2b] hover:bg-[#696766] transition duration-200 px-[11px] py-[7px] rounded-[5px] flex items-center gap-3"
                    >
                      <MdOutlinePolicy className="text-[20px] text-[#d5c9c9]" />{" "}
                      <span className="text-[#b8acac] group-hover:text-[#151414] transition-colors duration-200">
                        Check policies
                      </span>
                    </button>
                    <button
                      onClick={() => sendQuick("I want to apply for leave")}
                      className="cursor-pointer group box2 font-['Neue_Haas_Grotesk_Display_Pro'] bg-[#2b2b2b] hover:bg-[#696766] transition duration-200 px-[11px] py-[7px] rounded-[5px] flex items-center gap-3"
                    >
                      <MdTimeToLeave className="text-[20px] text-[#b8acac]" />{" "}
                      <span className="text-[#b8acac] group-hover:text-[#151414] transition-colors duration-200">
                        Apply leave
                      </span>
                    </button>
                    <button
                      onClick={() => sendQuick("I need a laptop")}
                      className="cursor-pointer group box3 font-['Neue_Haas_Grotesk_Display_Pro'] bg-[#2b2b2b] hover:bg-[#696766] transition duration-200 px-[11px] py-[7px] rounded-[5px] flex items-center gap-3"
                    >
                      <IoLaptopOutline className="text-[20px] text-[#b8acac]" />{" "}
                      <span className="text-[#b8acac] group-hover:text-[#151414] transition-colors duration-200">
                        Request asset
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                // Message list
                <>
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${
                        m.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] p-3 break-words rounded-2xl ${
                          m.sender === "user"
                            ? "bg-[#02febd] text-black rounded-br-[6px] rounded-tl-2xl rounded-tr-2xl"
                            : "bg-[#2b2b2b] text-[#e6e1e1] rounded-bl-2xl rounded-tr-2xl"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-[#2b2b2b] text-[#e6e1e1] p-3 rounded-2xl flex items-center gap-1">
                        <span className="inline-block w-3 h-3 rounded-full animate-pulse bg-[#cfcfcf]" />
                        <span className="inline-block w-3 h-3 rounded-full animate-pulse bg-[#cfcfcf] delay-200" />
                        <span className="inline-block w-3 h-3 rounded-full animate-pulse bg-[#cfcfcf] delay-400" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="chat-input w-full h-[10vh] absolute bottom-8 flex flex-row items-center gap-3 justify-center px-8">
              <div className="cursor-pointer doc w-[50px] h-[55px] bg-black rounded-[8px] flex items-center justify-center">
                <IoDocumentTextOutline className="text-[#ada6a6] text-[18px]" />
              </div>
              <div className="cursor-pointer voice w-[50px] h-[55px] bg-black rounded-[8px] flex items-center justify-center">
                <MdOutlineKeyboardVoice className="text-[#ada6a6] text-[18px]" />
              </div>
              <div className="message flex-1 h-[55px] bg-black rounded-[8px] px-3 relative flex items-center">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setStarted(true)}
                  placeholder="Need help with onboarding, leave, or policies?"
                  className="bg-transparent w-full resize-none focus:outline-none text-[#ada6a6] py-3 px-2 leading-snug"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`cursor-pointer send w-[48px] h-[45px] mt-[2px] mr-[5px] absolute right-0 flex items-center justify-center rounded-[8px] ${
                    input.trim()
                      ? "bg-[#02febd] text-black"
                      : "bg-[#3a3a3a] text-[#777]"
                  }`}
                >
                  <LuSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
