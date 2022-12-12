import Link from "next/link";

type CardProps = {
	title: string;
	href: string;
	desc: string;
	externalUrl: string;
};

const Card = ({ title, href, desc, externalUrl }: CardProps) => {
	return (
		<div className="p-3 rounded bg-white shadow cursor-pointer">
			<Link href={href}>
				<div>
					<h2 className="text-2xl font-semibold">{title}</h2>
					<h3 className="text-lg font-medium">{desc}</h3>
				</div>
			</Link>
			{/* <h2>{desc}</h2> */}
			<a className="underline mt-2" href={externalUrl}>
				API文档链接
			</a>
		</div>
	);
};

export default function Home() {
	return (
		<div className="bg-slate-50 grid grid-cols-3 gap-3 p-6 mx-auto">
			<Card
				title="编辑"
				href="/edit"
				desc="Edits Given a prompt and an instruction, the model will
					return an edited version of the prompt"
				externalUrl="https://beta.openai.com/docs/api-reference/edits"
			/>
			<Card
				title="生成图片"
				href="/generate-image"
				desc="Given a prompt and/or an input image, the model will generate a new image."
				externalUrl="https://beta.openai.com/docs/api-reference/embeddings/create"
			/>
			<Card
				title="生成代码"
				href="/generate-code"
				desc="You provide some code and an instruction for how to modify it, and the code-davinci-edit-001 model will attempt to edit it accordingly."
				externalUrl="https://beta.openai.com/docs/guides/code/editing-code"
			/>
			<Card
				title="生成故事"
				href="/generate-story"
				desc="You provide some code and an instruction for how to modify it, and the code-davinci-edit-001 model will attempt to edit it accordingly."
				externalUrl="https://beta.openai.com/docs/guides/code/editing-code"
			/>
		</div>
	);
}
