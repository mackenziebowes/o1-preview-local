import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import convertMarkdownToPlainText from "./chat-to-text";

const client = new OpenAI({
	apiKey: process.env["OPENAI_API_KEY"],
});

const chatId = 0;

async function main() {
	// pull in data
	const userMessage = fs.readFileSync("./input.txt", "utf-8");
	const chatHistoryText = fs.readFileSync(`./chats/${chatId}.json`, "utf-8");
	if (chatHistoryText.length > 0) {
		const chatHistory = JSON.parse(chatHistoryText);
		// create completion
		const chatCompletion = await client.chat.completions.create({
			messages: [...chatHistory, { role: "user", content: userMessage }],
			model: "o1-preview",
		});
		// save output
		chatHistory.push({
			role: "user",
			content: userMessage,
		});
		chatHistory.push({
			role: "assistant",
			content: chatCompletion.choices[0].message.content,
		});
		fs.writeFileSync(
			`./chats/${chatId}.json`,
			JSON.stringify(chatHistory),
			"utf-8"
		);
		console.log({ response: chatCompletion.choices[0].message.content });
		convertMarkdownToPlainText(
			`./chats/${chatId}.json`,
			`./outputs/${chatId}.txt`
		);
	} else {
		const chatHistory = [];
		// create completion
		const chatCompletion = await client.chat.completions.create({
			messages: [{ role: "user", content: userMessage }],
			model: "o1-preview",
		});
		// save output
		chatHistory.push({
			role: "user",
			content: userMessage,
		});
		chatHistory.push({
			role: "assistant",
			content: chatCompletion.choices[0].message.content,
		});
		fs.writeFileSync(
			`./chats/${chatId}.json`,
			JSON.stringify(chatHistory),
			"utf-8"
		);
		console.log({ response: chatCompletion.choices[0].message.content });
		convertMarkdownToPlainText(
			`./chats/${chatId}.json`,
			`./outputs/${chatId}.txt`
		);
	}
}

main();
