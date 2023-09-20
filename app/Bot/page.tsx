"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [gotChats, setgotChats] = useState<any>();

  const [messages, setMessage] = useState<any>([]);

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop()!.split(";").shift()!);
    }
  }

  useEffect(() => {
    const chatMessagesCookie = getCookie("chatMessages");
    if (chatMessagesCookie) {
      setMessage(JSON.parse(chatMessagesCookie));
    }
  }, []);

  function sendChat() {
    if (!gotChats) {
      return;
    }

    const newChat = {
      chat: "user",
      message: gotChats,
    };
    setMessage((prevMessages: any) => [...prevMessages, newChat]);

    saveChatsToCookie([...messages, newChat]);

    setgotChats("");
  }

  function saveChatsToCookie(chatsArray: any) {
    document.cookie = `chatMessages=${JSON.stringify(
      chatsArray
    )}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/; SameSite=None; Secure`;
  }

  function clearCookie(name: string) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  function clearChats() {
    clearCookie("chatMessages");
    setMessage([]); 
    setgotChats("");    
  }
  return (
    <div className="botChatMain">
      <Link href={"/"} className="closeChat">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="closeIcon"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="m7 7l10 10M7 17L17 7"
          />
        </svg>
      </Link>
      <div className="chats">
        {messages &&
          messages.map((singlemessage: any, index: any) => (
            <>
              {singlemessage.chat === "user" ? (
                <div className="userChats" key={index}>
                  <p>{singlemessage.message}</p>
                </div>
              ) : (
                <div className="botChats">
                  <p>{singlemessage.message}</p>
                </div>
              )}
            </>
          ))}
      </div>
      <div className="clearchats">
        <button onClick={clearChats}>clear chat</button>
      </div>
      <div className="chatInput">
        <input
          type="text"
          value={gotChats}
          onChange={(e) => setgotChats((e.target as HTMLInputElement).value)}
        />
        <button onClick={sendChat}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="sendIcon"
            viewBox="0 0 32 32"
          >
            <path
              fill="white"
              d="m27.45 15.11l-22-11a1 1 0 0 0-1.08.12a1 1 0 0 0-.33 1L6.69 15H18v2H6.69L4 26.74A1 1 0 0 0 5 28a1 1 0 0 0 .45-.11l22-11a1 1 0 0 0 0-1.78Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
