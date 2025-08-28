"use client";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";

const page = () => {
  return (
    <>
      <div className="main w-full bg-black ">
        <div className="page1 w-full h-[100vh] bg-black flex flex-row gap-1 rounded-2xl overflow-hidden py-[30px] px-[20px] relative ">
          <div className="page-left w-[15vw] bg-black rounded-t-xl rounded-b-xl ">
            page
          </div>

          <div className="page-right w-[85vw] flex flex-col gap-1">
            <div className="page1-top  h-[10vh] bg-[#131313] rounded-t-xl flex justify-between items-center px-[40px] py-[5px]">
              <h2 className="text-[#ccc3c3] font-['Neue_Haas_Grotesk_Display_Pro'] font-[600] text-[20px]">
                HR Buddy
              </h2>

              <div className="chat-options flex gap-5 items-center">
                <div className="bg-[#2c2c2c] px-[15px] py-[8px] rounded-[8px]">
                  <h2 className="text-[#868080] font-['Neue_Haas_Grotesk_Display_Pro'] font-[600] flex items-center gap-1">
                    <span className="text-[16px]">
                      <IoIosAdd />
                    </span>
                    New chat
                  </h2>
                </div>
                <div className="">
                  <h2 className="text-[#6e6868] font-['Neue_Haas_Grotesk_Display_Pro'] font-[600] flex items-center gap-2">
                    <span className="text-[16px]">
                      <RiResetLeftFill />
                    </span>
                    Clear chat
                  </h2>
                </div>
              </div>
            </div>
            <div className="page1-bottom w-full h-[90vh] bg-[#131313] rounded-b-xl">
              <div className="chat-input w-full bg-amber-100 h-[10vh] absolute bottom-10">
                <div className="doc"></div>
                <div className="voice"></div>
                <div className="message"></div>
                <div className="send"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
