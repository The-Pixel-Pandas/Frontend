import React, { useRef } from "react";
import GameView from "./GameView";

function CupHead() {
	const gameRef = useRef(null);

	return (
		<div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
			<GameView ref={gameRef} />
		</div>
	);
}

export default CupHead;
