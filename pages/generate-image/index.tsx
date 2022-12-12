import axios from "axios";
import type { ImagesResponse } from "openai";
import { FormEventHandler, useState } from "react";
import { Loading } from "../../components/Loading";
import { Wrapper } from "../../components/Wrapper";

async function queryImage(prompt: string, n?: number) {
	const reseponse: ImagesResponse = await axios
		.post("/api/openai", {
			prompt,
			type: "image-generation",
			n,
		})
		.then(s => s.data);
	console.log(JSON.stringify(reseponse, null, 2));
	return reseponse.data;
}

type Result = {
	url: string;
};

// image-generation
export default function GenerateImagePage() {
	const [value, setValue] = useState("");
	const [generateImageCount, setGenerateImageCount] = useState(1);
	const [images, setImages] = useState<{ urls: string[]; prompt: string }[]>(
		[]
	);
	const [loading, setLoading] = useState(false);
	const makeImage: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		setLoading(true);
		const urls = await queryImage(value, generateImageCount);
		setLoading(false);
		setImages(prev => {
			const newImages = {
				urls: urls.filter((s): s is Result => !!s.url).map(s => s.url),
				prompt: value,
			};
			return [...prev, newImages];
		});
	};

	return (
		<Wrapper>
			<form onSubmit={makeImage} className="relative flex space-x-1">
				<input
					type="text"
					value={value}
					onChange={e => setValue(e.target.value)}
					className="px-2 py-1 border border-blue-400 rounded"
				/>
				<label>
					<select
						value={generateImageCount}
						placeholder="生成图片数量"
						onChange={e => setGenerateImageCount(+e.target.value)}
					>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
					</select>
				</label>
				<button
					disabled={loading}
					className="px-2.5 py-1 rounded-lg bg-green-100 hover:bg-green-200 text-green-500 mx-1"
				>
					生成图片
				</button>
				{loading && <Loading />}
			</form>
			<div>
				<h2>示例语句</h2>
				<p>an armchair in the shape of an avocado</p>
				<p>a mermaid singing on the beach</p>
				<p>a dinner at a Chinese restaurant</p>
				<p>2022世界杯决赛现场</p>
			</div>
			{images.length > 0 && (
				<div className="grid grid-cols-3 gap-3 p-2">
					{images.map((s, index) => (
						<div
							className="flex flex-col space-y-3 p-4 rounded bg-slate-200"
							key={index}
						>
							{s.urls.map(s => (
								<div
									className="flex flex-col space-y-2"
									key={s}
								>
									<img src={s} alt="" />
								</div>
							))}
							<span>{s.prompt}</span>
							<input type="text" placeholder="修改图片" />
						</div>
					))}
				</div>
			)}
		</Wrapper>
	);
}
