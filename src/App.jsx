import React from "react";
import { Home } from "./views";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					{/* Add another routes here */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
