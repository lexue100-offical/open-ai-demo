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
				title="编辑文字"
				href="/edit"
				desc="根据指令编辑文字"
				externalUrl="https://beta.openai.com/docs/api-reference/edits"
			/>
			<Card
				title="生成图片"
				href="/generate-image"
				desc="根据描述生成图片"
				externalUrl="https://beta.openai.com/docs/api-reference/embeddings/create"
			/>
			<Card
				title="生成代码"
				href="/generate-code"
				desc="根据指令生成、修改代码"
				externalUrl="https://beta.openai.com/docs/guides/code/editing-code"
			/>
			<Card
				title="生成故事"
				href="/generate-story"
				desc="根据指令生成故事以及图片"
				externalUrl="https://beta.openai.com/docs/guides/completion/prompt-design"
			/>
		</div>
	);
}
