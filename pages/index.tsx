import Link from "next/link";

type CardProps = { href: string; desc: string; externalUrl: string };

const Card = ({ href, desc, externalUrl }: CardProps) => {
	return (
		<div className="p-3 rounded bg-white">
			<Link href={href}>
				<h2 className="text-lg font-semibold">{desc}</h2>
			</Link>
			{/* <h2>{desc}</h2> */}
			<a className="underline mt-2" href={externalUrl}>API文档链接</a>
		</div>
	);
};

export default function Home() {
	return (
		<div className="bg-slate-50 grid grid-cols-3 gap-3">
			<Card
				href="/edit"
				desc="Edits Given a prompt and an instruction, the model will
					return an edited version of the prompt"
				externalUrl="https://beta.openai.com/docs/api-reference/edits"
			/>
			<Card
				href="/generate-image"
				desc="Given a prompt and/or an input image, the model will generate a new image."
				externalUrl="https://beta.openai.com/docs/api-reference/embeddings/create"
			/>
		</div>
	);
}
