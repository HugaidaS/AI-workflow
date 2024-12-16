"use client";

import React, { useState } from "react";
import { CardDescription, CardTitle } from "@/components/cards-demo-3";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { GridLoader } from "react-spinners";

// Define the cocktail record interface for raw data from the backend
// TODO: Replace with ZOD schema
interface CocktailRecord {
  metadata: Record<string, unknown>;
  properties: {
    alcoholic: string;
    category: string;
    drinkThumbnail: string;
    glassType: string;
    ingredientMeasures: string;
    ingredients: string;
    instructions: string;
    name: string;
    text: string;
  };
  uuid: string;
}

// Define the cocktail interface for processed data
interface Cocktail {
  metadata: Record<string, unknown>;
  properties: {
    alcoholic: string;
    category: string;
    drinkThumbnail: string;
    glassType: string;
    ingredientMeasures: string[];
    ingredients: string[];
    instructions: string;
    name: string;
    text: string;
  };
  uuid: string;
}

// Helper function to parse arrays safely
const parseArray = (data: string): string[] => {
  try {
    // Replace single quotes with double quotes for valid JSON parsing
    const sanitizedData = data.replace(/'/g, '"');
    return JSON.parse(sanitizedData);
  } catch (error) {
    console.error("Failed to parse array:", error, data);
    return [];
  }
};

const ChatPage = () => {
  const [prompt, setPrompt] = useState(
    "I want something floral and refreshing, a bit alcoholic"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<Cocktail[]>([]);
  const [bartenderResponse, setBartenderResponse] = useState<string | null>(
    null
  );
  const [answeredPrompt, setAnsweredPrompt] = useState<string | null>(null);

  const placeholders = [
    "What cocktail would you like to try?",
    "How do you feel today?",
    "Describe your perfect drink",
    "What flavors do you like?",
    "Are you in the mood for something sweet or sour?",
    "What is your favorite spirit?",
    "Do you prefer a shaken or stirred cocktail?",
  ];

  const handleSubmit = async () => {
    setPrompt("");
    setIsLoading(true);
    setResponse([]);
    setBartenderResponse(null);
    setAnsweredPrompt(null);

    try {
      const res = await fetch("/dashboard/chat/api", {
        method: "POST",
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await res.json();

      // Transform the raw data into the processed Cocktail structure
      const parsedItems = data.items.map((item: CocktailRecord) => ({
        ...item,
        properties: {
          ...item.properties,
          ingredients: parseArray(item.properties.ingredients),
          ingredientMeasures: parseArray(item.properties.ingredientMeasures),
        },
      }));

      console.log(parsedItems);
      setResponse(parsedItems);
      setBartenderResponse(data.generated);
      setAnsweredPrompt(data.userPrompt);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center size-full p-4">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold text_gradient_tertiary mb-2">
            Looking for the best matches...
          </h3>
          <GridLoader color="purple" size={20} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full p-4 transition-all">
      <div>
        <div className="flex flex-col gap-4">
          {!answeredPrompt && !isLoading && (
            <h1 className="text_gradient_tertiary text-3xl xl:text-4xl text-center">
              Ask AI Bartender for a cocktail recommendation
            </h1>
          )}
          {answeredPrompt && (
            <div className="w-full flex gap-4 ">
              <div className="flex flex-col items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>Me</div>
              </div>
              <p className="text-sm w-full sm:max-w-[50%] flex chat_userBubble element-bg">
                {answeredPrompt}
              </p>
            </div>
          )}
          {bartenderResponse && (
            <div className="w-full flex gap-4 justify-end ">
              <p className="text-sm  w-full sm:max-w-[50%] chat_barternderBubble element-bg">
                {bartenderResponse}
              </p>
              <div className="flex flex-col items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>Dio</div>
              </div>
            </div>
          )}
        </div>
        <div className="my-4 text-lg text-gray-600 flex flex-row flex-wrap justify-around gap-3">
          {response.map((item) => (
            <BackgroundGradient
              className="rounded-[22px] w-full sm:max-w-sm p-4 sm:p-10 bg-gray-100 dark:bg-zinc-900 h-full"
              key={item.uuid}
            >
              <Image
                src={item.properties.drinkThumbnail}
                alt={item.properties.name}
                width={180}
                height={100}
                className="rounded-xl flex"
              />

              <CardTitle className="text-dark_light">
                {item.properties.name}
              </CardTitle>
              <CardDescription className="overflow-scroll max-h-52 flex flex-col gap-2">
                <div>
                  {item.properties.alcoholic} {item.properties.category}
                </div>
                <div>
                  <h3 className="font-bold text-dark_light">Ingredients:</h3>
                  <ul className="list-disc">
                    {item.properties.ingredients.map((ingredient, idx) => (
                      <li key={idx}>
                        {ingredient} -{" "}
                        {item.properties.ingredientMeasures[idx] || "N/A"}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-dark_light">Instructions:</h3>
                  {item.properties.instructions}
                </div>
              </CardDescription>
            </BackgroundGradient>
          ))}
        </div>
      </div>
      <div className="w-full">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(e) => setPrompt(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatPage;
