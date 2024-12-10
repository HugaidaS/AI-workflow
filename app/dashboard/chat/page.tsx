"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardTitle } from "@/components/cards-demo-3";
import Image from "next/image"; // Define the cocktail record interface for raw data from the backend

// Define the cocktail record interface for raw data from the backend
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
  const [bartenderResponse, setBartenderResponse] = useState("");

  const handleSubmit = async () => {
    setPrompt("");
    setIsLoading(true);
    setResponse([]);
    setBartenderResponse("");

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
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-3xl font-bold">
          Ask the Midnight Bartender for a cocktail recommendation
        </h1>
        <p>{bartenderResponse}</p>
        <div className="my-4 text-lg text-gray-600 flex flex-row flex-wrap">
          {response.map((item) => (
            <Card key={item.uuid} className="max-h-[500px]">
              <Image
                src={item.properties.drinkThumbnail}
                alt={item.properties.name}
                width={180}
                height={100}
                className="rounded-xl"
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
            </Card>
          ))}
        </div>
      </div>
      <Input
        value={prompt}
        disabled={isLoading}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            await handleSubmit();
          }
        }}
        placeholder="What cocktail would you like to try?"
      />
    </div>
  );
};

export default ChatPage;
