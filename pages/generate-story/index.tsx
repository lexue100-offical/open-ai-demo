import { FormEventHandler, useState } from "react";
import { Button, Textarea, Toast } from "flowbite-react";
import { Input } from "../../components/Input";
import { Wrapper } from "../../components/Wrapper";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../components/Loading";

async function queryStory(prompt: string) {
	const reseponse = await axios
		.post<{ story: string; images: string[] }>(
			"/api/openai",
			{
				type: "generate-story",
				prompt,
			},
			{
				timeout: 60 * 1000,
			}
		)
		.then(s => s.data);
	return reseponse;
}

export default function GenerateStoryPage() {
	const [value, setValue] = useState(
		"写出一个关于中国80年代的工人阶级的浪漫爱情故事"
	);
	const [output, setOutput] = useState("");
	const { isFetching, refetch, isError, error } = useQuery({
		queryFn: () => queryStory(value),
		queryKey: ["generate-story", value],
		enabled: false,
		onSuccess: ({ story, images }) => {
			setOutput(story);
			setImages(images);
		},
	});
	const [images, setImages] = useState<string[]>([]);
	const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		refetch();
	};
	return (
		<Wrapper>
			<form onSubmit={onSubmit} className="relative space-y-2">
				{isError && <Toast>{(error as AxiosError).toString()}</Toast>}
				{isFetching && <Loading />}
				<div className="flex space-x-4">
					<Input
						type="text"
						value={value}
						onChange={e => setValue(e.target.value)}
					/>
					<Button disabled={isFetching} type="submit">
						提交
					</Button>
				</div>
				<Textarea
					readOnly
					value={output}
					onChange={e => setOutput(e.target.value)}
					className="min-h-[20rem]"
				></Textarea>
				{images.length > 0 && (
					<>
						<h2 className="text-2xl">生成的图片</h2>
						<div className="grid grid-cols-3 p-6 gap-4">
							{images.map(s => (
								<img
									key={s}
									src={s}
									alt={s}
									className="transition-all hover:scale-105 p-1 bg-slate-200 rounded"
								/>
							))}
						</div>
					</>
				)}
			</form>
		</Wrapper>
	);
}
