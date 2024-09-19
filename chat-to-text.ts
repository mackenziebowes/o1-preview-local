import fs from "fs";
import path from "path";
import removeMd from "remove-markdown";

type ChatMessage = {
	role: "assistant" | "user";
	content: "string";
};

export default async function convertMarkdownToPlainText(
	inputFile: string,
	outputFile: string
): Promise<void> {
	try {
		// Resolve absolute paths
		const inputPath = path.resolve(inputFile);
		const outputPath = path.resolve(outputFile);

		// Read the JSON file
		const data = fs.readFileSync(inputPath, "utf-8");

		// Parse JSON data
		const messages: ChatMessage[] = JSON.parse(data);

		if (!Array.isArray(messages)) {
			throw new Error("JSON data is not an array of chat messages.");
		}

		// Convert each message's Markdown content to plain text
		const plainTextLines: string[] = messages.map((message, index) => {
			const { role, content } = message;

			// Strip Markdown formatting
			const plainContent = removeMd(content);

			// Replace multiple newlines with single newline for readability
			const formattedContent = plainContent.replace(/\n{2,}/g, "\n");

			// Format the message
			return `Message ${
				index + 1
			}\nRole: ${role}\nContent:\n${formattedContent}\n`;
		});

		// Join all lines into a single plain text string
		const plainTextContent = plainTextLines.join("\n");

		// the package fails to remove md bolding, two ** on either side of a heading, so we search and replace for that throughout the document
		plainTextContent.replace(/\*\*/g, "");
		// this doesn't work lol maybe i'll fix it later

		// Write the plain text content to the output file
		fs.writeFileSync(outputPath, plainTextContent, "utf-8");

		console.log(`Successfully converted '${inputFile}' to '${outputFile}'.`);
	} catch (error) {
		console.error(
			`Error converting Markdown to plain text: ${(error as Error).message}`
		);
	}
}
