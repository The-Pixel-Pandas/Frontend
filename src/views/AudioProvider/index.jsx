import React from "react";
import { AudioPlayer } from "../../components";

const AudioProvider = () => {
	return (
		<>
			<AudioPlayer src="/audios/Click.mp3" audioName="ClickSound" />
			<AudioPlayer src="/audios/ClosePopup.mp3" audioName="ClosePopupSound" />
			<AudioPlayer src="/audios/OpenPopup.mp3" audioName="OpenPopupSound" />
		</>
	);
};

export default AudioProvider;
