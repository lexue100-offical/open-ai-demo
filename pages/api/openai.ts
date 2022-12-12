// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
	editText,
	generateCode,
	generateImage,
	getCompleteResponse,
} from "../../utils";
import { isEmpty } from "lodash-es";
import { NextApiRequest, NextApiResponse } from "next";

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
			default:
				throw new Error("参数错误");
			// break
		}
		console.log({ response });
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		return res.status(isEmpty(response) ? 500 : 200).json(response);
	}
}
