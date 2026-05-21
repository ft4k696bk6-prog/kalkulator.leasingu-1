import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles.css";
import App from "./app.tsx";
import { initGoogleAnalytics } from "./lib/google-analytics";

const queryClient = new QueryClient();

initGoogleAnalytics(import.meta.env.VITE_GA_MEASUREMENT_ID, import.meta.env.VITE_GOOGLE_TAG_ID);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Router>
				<App />
			</Router>
		</QueryClientProvider>
	</StrictMode>,
);
