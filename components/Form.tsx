import { ChangeEventHandler, FormEventHandler } from "react";
import { CompleteResponse } from "../utils";

type FormProps = {
	text: string;
	index: number;
	changeInput: (index: number, text: string) => void;
};

async function run(prompt: string) {
	const reseponse: CompleteResponse = await fetch(
		"http://localhost:3000/api/openai",
		{
			method: "POST",
			body: JSON.stringify({
				prompt,
                type: "text-complete"
			}),
		}
	).then(s => s.json());
	console.log(JSON.stringify(reseponse, null, 2));
}

export const Form = ({ text, index, changeInput }: FormProps) => {
	const onSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		if (text) run(text);
	};
	const onChange: ChangeEventHandler<HTMLInputElement> = e => {
		changeInput(index, e.target.value);
	};
	return (
		<form onSubmit={onSubmit} className="p-2">
			<input
				type="text"
				value={text}
				onChange={onChange}
				className="px-2 py-1 border border-blue-400 rounded"
			/>
			<button type="submit" className="px-2.5 py-1 rounded-lg bg-green-100 hover:bg-green-200 text-green-500 mx-1">提交</button>
		</form>
	);
};
