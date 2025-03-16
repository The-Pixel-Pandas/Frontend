import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { eventHandler } from "../../services";

const AudioPlayer = ({ src, audioName }) => {
	const [, setSoundActive] = useState(false);
	const audioRef = useRef(null);

	useEffect(() => {
		eventHandler.addEventListener(audioName, playSound);
		return () => {
			eventHandler.removeEventListener(audioName, playSound);
		};
	}, []);

	const playSound = () => {
		const audio = new Audio(src);
		audio.play();
		setSoundActive(true);
		setTimeout(() => {
			setSoundActive(false);
		}, 300);
	};
	return (
		<>
			<audio
				ref={audioRef}
				src={src}
				preload="auto"
				style={{ display: "none" }}
			/>
		</>
	);
};

AudioPlayer.propTypes = {
	src: PropTypes.string,
	audioName: PropTypes.string,
};

export default AudioPlayer;
