"use client";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { MdTimeToLeave } from "react-icons/md";
import { MdOutlinePolicy } from "react-icons/md";
import { IoLaptopOutline } from "react-icons/io5";

const page = () => {
  return (
    <>
      <div className="main w-full bg-black ">
        <div className="page1 w-full h-[100vh] bg-black flex flex-row gap-1 rounded-2xl overflow-hidden py-[30px] px-[20px]  ">
          <div className="page-left w-[15vw] bg-black rounded-t-xl rounded-b-xl ">
            page
          </div>

          <div className="page-right w-[85vw] flex flex-col gap-1">
            <div className="page1-top  h-[10vh] bg-[#131313] rounded-t-xl flex justify-between items-center px-[40px] py-[5px]">
              <h2 className="text-[#ccc3c3] font-['PP_Editorial_New'] font-[500] text-[20px]">
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

            <div className="page1-bottom w-full h-[90vh] bg-[#131313] rounded-b-xl relative ">
              <div className="page-mid  w-[50vw] h-[50vh] absolute left-[50%] top-[35%] -translate-x-[50%] -translate-y-[50%] pt-20">
                <div className="w-full   flex flex-col items-center justify-center gap-10">
                  <h1 className="font-['PP_Editorial_New'] text-[55px] font-[500]  text-[#dad0d0] leading-[70px] text-center">
                    Your HR Buddy, your friendly assistant for quick workplace
                    support
                  </h1>

                  <p className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[20px] text-[#9d9292]">
                    Get instant help anytime with HR Buddy
                  </p>
                  <div className=" flex items-center gap-10">
                    <div className="box1 font-['Neue_Haas_Grotesk_Display_Pro'] bg-[#2b2b2b] px-[11px] py-[7px] rounded-[5px]">
                      <h2 className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[15px] text-[#b8acac] flex items-center gap-3">
                        <span className="text-[20px]">
                          <MdOutlinePolicy />
                        </span>{" "}
                        Check Policies
                      </h2>
                    </div>
                    <div className="box2 font-['Neue_Haas_Grotesk_Display_Pro']">
                      <h2 className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[15px] text-[#b8acac] bg-[#2b2b2b] px-[11px] py-[7px] rounded-[5px] flex items-center gap-3">
                        <span className="text-[20px]">
                          <MdTimeToLeave />
                        </span>
                        Apply Leave
                      </h2>
                    </div>
                    <div className="box3 font-['Neue_Haas_Grotesk_Display_Pro']">
                      <h2 className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[15px] text-[#b8acac] bg-[#2b2b2b] px-[11px] py-[7px] rounded-[5px] flex items-center gap-3">
                        <span className="text-[20px]">
                          <IoLaptopOutline />
                        </span>{" "}
                        Request Asset
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chat-input w-full  h-[10vh] absolute bottom-8 flex flex-row items-center gap-3 justify-center">
                <div className="doc w-[50px] h-[55px] bg-black rounded-[8px] flex items-center justify-center ">
                  <span className="text-[#ada6a6] text-[18px]">
                    <IoDocumentTextOutline />
                  </span>
                </div>
                <div className="voice w-[50px] h-[55px] bg-black  rounded-[8px] flex items-center justify-center">
                  <span className="text-[#ada6a6] text-[18px]">
                    <MdOutlineKeyboardVoice />
                  </span>
                </div>
                <div className="message w-[50vw] h-[55px] bg-black  rounded-[8px] px-[2px] relative flex items-center pl-5">
                  <h2 className="font-['Neue_Haas_Grotesk_Display_Pro'] text-[#ada6a6]">
                    Need help with onboarding, leave, or policies?
                  </h2>
                  <div className="send w-[48px] h-[45px] bg-[#02febd] mt-[4px] mr-[5px]  rounded-[8px] absolute right-0 flex items-center justify-center">
                    <span className="text-black text-[18px]">
                      <LuSend />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
