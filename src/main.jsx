/* eslint-disable react/react-in-jsx-scope */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
const clientId = import.meta.env["VITE_GOOGLE_CLIENT_ID"];

root.render(
	<StrictMode>
		<GoogleOAuthProvider clientId={clientId}>
			<App />
		</GoogleOAuthProvider>
	</StrictMode>
);
