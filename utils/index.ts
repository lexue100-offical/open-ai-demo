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

export type CompleteResponse = Awaited<ReturnType<typeof getCompleteResponse>>;
// console.log(completion.data.choices[0].text);
