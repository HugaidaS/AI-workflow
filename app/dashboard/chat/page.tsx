'use client';

import React, {useState} from 'react'
import {Input} from "@/components/ui/input";

const ChatPage = () => {
  const [prompt, setPrompt] = useState("I feel enthusiastic today and have the xmas spirit");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>Result here</div>
      <Input
        value={prompt}
        disabled={isLoading}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        placeholder="What poem are you looking for today?"
      />
    </div>
  )
}
export default ChatPage
