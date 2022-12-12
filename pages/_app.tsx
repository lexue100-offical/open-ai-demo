import "../styles/globals.css";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider
			client={
				new QueryClient({
					defaultOptions: {
						queries: {
							refetchOnWindowFocus: false,
						},
					},
				})
			}
		>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}

export default MyApp;
