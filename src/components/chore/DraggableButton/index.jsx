import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DraggableButton = ({ initialPosition = "right" }) => {
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const [isAtEdge, setIsAtEdge] = useState(false);
	const buttonRef = useRef(null);
	const dragRef = useRef({ startX: 0, startY: 0 });
	const navigate = useNavigate();
	const [canNavigate, setCanNavigate] = useState(true);

	useEffect(() => {
		const x = initialPosition === "right" ? window.innerWidth - 40 : -25;
		setPosition({ x, y: window.innerHeight / 2 });
	}, [initialPosition]);

	const handleMouseDown = (e) => {
		setIsDragging(true);
		dragRef.current = {
			startX: e.pageX - position.x,
			startY: e.pageY - position.y,
		};
		setCanNavigate(false);
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;

		const newX = e.pageX - dragRef.current.startX;
		const newY = e.pageY - dragRef.current.startY;
		const x = Math.max(0, Math.min(window.innerWidth - 64, newX));
		const y = Math.max(0, Math.min(window.innerHeight - 64, newY));

		setPosition({ x, y });
	};

	const handleMouseUp = (e) => {
		if (!isDragging) return;

		setIsDragging(false);

		const distanceToLeft = e.pageX - position.x;
		const distanceToRight = e.pageX - (window.innerWidth - position.x);
		console.log("distanceToLeft", distanceToLeft);
		console.log("distanceToRight", distanceToRight);

		const newX =
			distanceToLeft < distanceToRight ? -25 : window.innerWidth - 40;
		setPosition((prev) => ({ ...prev, x: newX }));
		setIsAtEdge(distanceToLeft < distanceToRight);
	};

	useEffect(() => {
		if (isDragging) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging]);

	return (
		<div
			ref={buttonRef}
			style={{
				position: "fixed",
				top: position.y,
				left: position.x,
				width: "64px",
				height: "64px",
				cursor: isDragging ? "grabbing" : "grab",
				transition: isDragging ? "none" : "all 300ms ease",
				opacity: 0.8,
				zIndex: 1000,
				transform: isHovered ? "scale(1.1)" : "scale(1)",
			}}
			onMouseDown={handleMouseDown}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false);
			}}
			onClick={() => {
				if (isDragging || !canNavigate) return;
				navigate("/game");
			}}
		>
			<img
				src={
					isHovered || isDragging
						? "https://platform-ik.g123.jp/game/production/assets/aria-side-active-064e1cfd.png?tr=dpr-1.25%2Ch-64%2Cw-64"
						: "https://platform-ik.g123.jp/game/production/assets/aria-top-idel-c3d83f4d.png?tr=dpr-1.25%2Ch-64%2Cw-64"
				}
				alt="DraggableButton"
				className={`w-full h-full select-none ${isAtEdge ? "transform rotate-y-180" : ""}`}
				draggable="false"
			/>
		</div>
	);
};

DraggableButton.propTypes = {
	initialPosition: PropTypes.oneOf(["left", "right"]),
};

export default DraggableButton;
