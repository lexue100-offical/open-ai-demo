import { ReactNode } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
	return <div className="p-6 bg-slate-50">{children}</div>;
};
