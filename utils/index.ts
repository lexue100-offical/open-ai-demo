import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
	baseOptions: {
		timeout: 60 * 1000,
	},
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

export const generateStory = async (prompt: string) => {
	const { data: storyData } = await openai.createCompletion({
		model: "text-davinci-002",
		prompt,
		max_tokens: 600,
	});
	const story = storyData.choices[0].text;
	if (!story) throw new Error("没有生成story");
	const { data } = await openai
		.createImage({
			prompt: `${prompt}\n${story}`,
			n: 9,
			size: "512x512",
		})
		.catch(err => {
			console.log(err);
			return { data: { data: [] } };
		});

	return {
		story,
		images: data.data.map(s => s.url!),
	};
};
