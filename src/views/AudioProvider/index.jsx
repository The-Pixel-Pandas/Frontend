import React from "react";
import { AudioPlayer } from "../../components";

const AudioProvider = () => {
	return (
		<>
			<AudioPlayer src="/audios/Click.mp3" audioName="ClickSound" />
			<AudioPlayer src="/audios/ClosePopup.wav" audioName="ClosePopupSound" />
			<AudioPlayer src="/audios/OpenPopup.wav" audioName="OpenPopupSound" />
		</>
	);
};

export default AudioProvider;
