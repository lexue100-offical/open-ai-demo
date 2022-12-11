import { useState } from "react";
import produce from "immer";
import { Form } from "../../components/Form";

type Prompt = { isPrompt: boolean; text: string };

export default function DialoguePage() {
	const [prompts, setPrompts] = useState<Prompt[]>([
		{ isPrompt: true, text: "" },
	]);
	const changeInput = (index: number, text: string) => {
		setPrompts(
			produce<Prompt[]>(draft => {
				draft[index].text = text;
			})
		);
	};
    const appendInput = () => {

    }

	return (
		<div>
			{prompts.map((s, index) =>
				s.isPrompt ? (
					<Form
						text={s.text}
						changeInput={changeInput}
						index={index}
						key={index}
					/>
				) : (
					<div key={index}>1231</div>
				)
			)}
		</div>
	);
}
