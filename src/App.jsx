import React from "react";
import { Login,NotFound } from "./views";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					{/* Add another routes here */}
					<Route path="*" element={<NotFound />} /> 
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
