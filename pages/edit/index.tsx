import { CreateEditResponse } from "openai";
import axios from "axios";
import { Instruction } from "../../components/Instruction";

type Prompt = {
	input: string;
	instruction: string;
	output: string;
	loading?: boolean;
};

const EXAMPLE: Prompt[] = [
	{
		input: "GPT-3 is a very nice AI\nThat's pretty good at writing replies\nWhen it's asked a question\nIt gives its suggestion\nThis is a poem it made that rhymes",
		instruction: "Make this in the voice of GPT-3",
		output: "",
	},
	{
		input: "I have a apple\nhe had diner\nshw willl bee cleaning thhe hoouse today night",
		instruction: "Remove typos and write two more sentences",
		output: "",
	},
];

async function edit(input: string, instruction: string) {
	const reseponse = await axios
		.post<CreateEditResponse>("/api/openai", {
			type: "edit-text",
			input,
			instruction,
		})
		.then(s => s.data);
	console.log(JSON.stringify(reseponse, null, 2));
	return reseponse;
}

export default function EditPage() {
	return <Instruction queryFunction={edit} initalState={EXAMPLE} />;
}
