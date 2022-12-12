import { useState } from "react";
import produce from "immer";
import { Wrapper } from "./Wrapper";
import { Input } from "./Input";
import { CreateEditResponse } from "openai";
import { Loading } from "./Loading";

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

type InstructionProps<T> = {
	initalState: Prompt[];
	queryFunction: (input: string, instruction: string) => Promise<T>;
};

export const Instruction = <T extends unknown>({
	initalState,
	queryFunction,
}: InstructionProps<T>) => {
	const [prompts, setPrompts] = useState<Prompt[]>(initalState);
	const addNewForm = () => {
		setPrompts(prev => [
			...prev,
			{
				input: "",
				instruction: "",
				output: "",
			},
		]);
	};

	const updateInstruction = (index: number, instruction: string) => {
		setPrompts(
			produce(s => {
				s[index].instruction = instruction;
			})
		);
	};

	const updateInput = (index: number, input: string) => {
		setPrompts(
			produce(s => {
				s[index].input = input;
			})
		);
	};

	const updateOutput = (index: number, output: string) => {
		setPrompts(
			produce(s => {
				s[index].output = output;
				s[index].loading = false;
			})
		);
	};

	const onSubmit = async (index: number) => {
		const prompt = prompts[index];
		setPrompts(
			produce(s => {
				s[index].loading = true;
			})
		);
		const response = await queryFunction(prompt.input, prompt.instruction);
		//@ts-ignore
		updateOutput(index, response.choices.map(s => s.text).join("\n"));
	};

	return (
		<Wrapper>
			{prompts.map((s, index) => (
				<form
					key={index}
					className="flex rounded px-2 space-x-6 my-2"
					onSubmit={e => {
						e.preventDefault();
						onSubmit(index);
					}}
				>
					<div className="flex flex-col flex-1 space-y-2">
						<textarea
							className="p-3 rounded resize-none border border-blue-200 min-h-[10rem]"
							value={s.input}
							onChange={e => updateInput(index, e.target.value)}
						/>
						<div className="flex items-center space-x-2">
							<label htmlFor={index.toString()}>
								Instuction说明
							</label>
							<Input
								id={index.toString()}
								type="text"
								value={s.instruction}
								onChange={e =>
									updateInstruction(index, e.target.value)
								}
							/>
							<button className="text-blue-400 bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded">
								提交
							</button>
						</div>
					</div>
					<div className="relative flex-1">
						{s.loading && <Loading />}
						<textarea
							value={s.output}
							className="p-3 w-full rounded resize-none readonly:opacity-90 border border-slate-300 min-h-[10rem]"
							readOnly
							placeholder="输出"
							onChange={e => updateOutput(index, e.target.value)}
						/>
					</div>
				</form>
			))}
			<button
				className="text-blue-400 bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded"
				onClick={addNewForm}
			>
				新Edit
			</button>
		</Wrapper>
	);
};
