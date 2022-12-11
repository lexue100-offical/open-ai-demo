// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { editText, generateCode, generateImage, getCompleteResponse } from "../../utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { prompt, type, n, input, instruction } = JSON.parse(req.body);
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
			default:
				throw new Error("参数错误");
		}
		console.log({ response });
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		return res.status(500).json(response);
	}
}