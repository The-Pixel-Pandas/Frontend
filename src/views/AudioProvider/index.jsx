import React from "react";
import { AudioPlayer } from "../../components";
import ClickSound from "../../assets/audios/Click.mp3";
import ClosePopupSound from "../../assets/audios/ClosePopup.wav";
import OpenPopupSound from "../../assets/audios/OpenPopup.wav";
import LikeSound from "../../assets/audios/Like.mp3";
import ButtonSound from "../../assets/audios/Button.mp3";

const AudioProvider = () => {
	return (
		<>
			<AudioPlayer src={ClickSound} audioName="ClickSound" />
			<AudioPlayer src={ClosePopupSound} audioName="ClosePopupSound" />
			<AudioPlayer src={OpenPopupSound} audioName="OpenPopupSound" />
			<AudioPlayer src={LikeSound} audioName="LikeSound" />
			<AudioPlayer src={ButtonSound} audioName="ButtonSound" />
		</>
	);
};

export default AudioProvider;
