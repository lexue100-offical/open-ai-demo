// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
	editText,
	generateCode,
	generateImage,
	getCompleteResponse,
	generateStory,
} from "../../utils";
import { isEmpty } from "lodash-es";
import { NextApiRequest, NextApiResponse } from "next";
import { AxiosError } from "axios";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log("request body", req.body, typeof req.body);
	const { prompt, type, n, input, instruction } = req.body;
	let response = {};
	try {
		switch (type) {
			case "image-generation":
				response = await generateImage(prompt, n);
				break;
			case "text-complete":
				response = await getCompleteResponse(prompt);
				break;
			case "edit-text":
				response = await editText(input, instruction);
				break;
			case "generate-code":
				response = await generateCode(input, instruction);
				break;
			case "generate-story":
				response = await generateStory(prompt);
				break;
			default:
				throw new Error("参数错误");
			// break
		}
		res.status(200).json(response);
	} catch (error) {
		// console.log(error)
		if (error instanceof AxiosError) {
			return res.status(500).json(error)
		}
		return res.status(isEmpty(response) ? 500 : 200).json(response);
	}
}
