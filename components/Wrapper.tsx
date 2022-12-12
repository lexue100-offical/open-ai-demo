import Link from "next/link";
import { ReactNode } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
	return (
		<div className="p-6 bg-slate-50">
			<Link href="/" className="underline">
				返回主页
			</Link>
			{children}
		</div>
	);
};
