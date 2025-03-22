import React, {
	useRef,
	forwardRef,
	useLayoutEffect,
	useImperativeHandle,
} from "react";
import Phaser, { Game } from "phaser";
import { GameScene } from "./Scenes/GameScene";
import { PreLoader } from "./Scenes/PreLoader";

const gameConfig = {
	width: "100%",
	height: "100%",
	type: Phaser.AUTO,
	backgroundColor: "#0c0724",
	scene: [PreLoader, GameScene],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: false,
		},
	},
	audio: {
		disableWebAudio: false,
		unlock: false,
	},
	parent: "game-container",
};

const GameView = forwardRef((props, ref) => {
	const containerRef = useRef(null);
	const gameInstanceRef = useRef(null);

	useImperativeHandle(ref, () => ({
		game: gameInstanceRef.current,
		scene: gameInstanceRef.current?.scene,
	}));

	useLayoutEffect(() => {
		if (!gameInstanceRef.current && containerRef.current) {
			gameInstanceRef.current = new Game({
				...gameConfig,
				parent: containerRef.current,
			});
		}

		return () => {
			if (gameInstanceRef.current) {
				gameInstanceRef.current.destroy(true);
				gameInstanceRef.current = null;
			}
		};
	}, []);

	return (
		<div
			id="game-container"
			ref={containerRef}
			style={{ width: "100%", height: "100%" }}
		/>
	);
});

GameView.displayName = "GameView";

export default GameView;
