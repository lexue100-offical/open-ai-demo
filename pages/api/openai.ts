// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generateImage, getCompleteResponse } from "../../utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { prompt, type, n } = JSON.parse(req.body);
	let response = {};
	try {
		switch (type) {
			case "image-generation":
				response = await generateImage(prompt, n);
				break;
			case "text-complete":
				response = await getCompleteResponse(prompt);
				break;
			default:
				throw new Error("no type");
		}
		console.log({ response });
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		return res.status(500).json(response);
	}
}
