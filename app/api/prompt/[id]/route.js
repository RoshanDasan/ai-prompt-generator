import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET functionality
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
};

// PATCH functionality
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existPrompt = await Prompt.findById(params.id);
    if (!existPrompt) return new Response("Prompt not found", { status: 404 });
    existPrompt.prompt = prompt;
    existPrompt.tag = tag;
    await existPrompt.save();

    return new Response(JSON.stringify(existPrompt), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};

// DELETE functionality
export const DELETE = async (request, { params }) => {
  try {
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
