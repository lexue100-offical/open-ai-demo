import { ComponentProps } from "react";

// with some styling
export const Input = (props: ComponentProps<"input">) => {
	return (
		<input
			className="flex-1 px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300"
			{...props}
		/>
	);
};
