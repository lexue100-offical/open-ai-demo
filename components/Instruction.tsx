import { useState } from "react";
import produce from "immer";
import { Wrapper } from "./Wrapper";
import { Input } from "./Input";
import { CreateEditResponse } from "openai";

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
						{s.loading && (
							<svg
								width="1em"
								height="1em"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 1024 1024"
								className="absolute animate-spin left-2 top-2"
								fill="blue"
							>
								<path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z" />
							</svg>
						)}
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
