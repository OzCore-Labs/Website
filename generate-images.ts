import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImage(prompt: string, filename: string) {
  console.log(`Generating ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(path.join(process.cwd(), 'public', filename), buffer);
        console.log(`Saved ${filename}`);
        return;
      }
    }
    console.log(`No image data found for ${filename}`);
  } catch (e) {
    console.error(`Error generating ${filename}:`, e);
  }
}

async function main() {
  await generateImage("A hyperrealistic 3D render of the Earth globe, dark space background, glowing green and blue city lights, high resolution, highly detailed, spatial data visualization style, centered, isolated on black", "earth-globe.png");
  await generateImage("A high-tech security intelligence dashboard UI on a dark screen, glowing green map, data visualization, futuristic, highly detailed", "security-dashboard.png");
  await generateImage("A 3D tactical map showing routing and security zones, high-tech GIS interface, dark mode, glowing green paths, highly detailed", "dignitary-visit.png");
  await generateImage("A heat map showing CO2 emissions, dark theme, glowing green and orange data points, high-tech GIS, highly detailed", "co2-emissions.png");
  await generateImage("A modern map-based mobile app interface showing local artisans, dark mode, glowing green location pins, highly detailed", "artisan-marketplace.png");
  await generateImage("Abstract 3D glowing green layers of spatial data, futuristic infrastructure, dark background, highly detailed", "product-vision.png");
}

main();
