import React from "react";
import { Home, Login } from "./views";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					{/* Add another routes here */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
