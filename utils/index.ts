import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getCompleteResponse = async (prompt?: string) => {
	const { data } = await openai.createCompletion({
		model: "text-davinci-002",
		prompt: prompt ?? "Hello world",
	});
	return data;
};

export const generateImage = async (prompt: string, n?: number) => {
	const { data } = await openai.createImage({
		prompt,
		n,
	});
	return data;
};

export const editText = async (input: string, instruction: string) => {
	const { data } = await openai.createEdit({
		model: "text-davinci-edit-001",
		input,
		instruction,
	});
	return data;
};

export const generateCode = async (input: string, instruction: string) => {
	const { data } = await openai.createEdit({
		model: "code-davinci-edit-001",
		input,
		instruction,
	});
    
	return data;
};
