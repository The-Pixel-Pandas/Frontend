import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<GoogleOAuthProvider clientId="264265346419-tv7ghbm1e24ectl145huhosbn9sfmsus.apps.googleusercontent.com">
			<App />
		</GoogleOAuthProvider>
	</StrictMode>
);
