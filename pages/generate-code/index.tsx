import { CreateEditResponse } from "openai";
import { Instruction } from "../../components/Instruction";

type Prompt = {
	input: string;
	instruction: string;
	output: string;
	loading?: boolean;
};

const EXAMPLE: Prompt[] = [
	{
		input: "",
		instruction: "使用Python写一个计算斐波那契数列的函数",
		output: "",
	},
	{
		input: "def add_num(a, b):\n  return a + b",
		instruction: "基于Python3.9，修改该函数，使add_num函数的参数带有类型",
		output: "",
	},
];

async function edit(input: string, instruction: string) {
	const reseponse: CreateEditResponse = await fetch(
		"http://localhost:3000/api/openai",
		{
			method: "POST",
			body: JSON.stringify({
				type: "generate-code",
				input,
				instruction,
			}),
		}
	).then(s => s.json());
	console.log(JSON.stringify(reseponse, null, 2));
	return reseponse;
}

export default function GenerateCodePage() {
	return <Instruction queryFunction={edit} initalState={EXAMPLE} />;
}
