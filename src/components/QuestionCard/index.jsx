import React from "react";
import questionBox from "../../assets/images/questionBox.png";
import PropTypes from "prop-types";
import coinLogo from "../../assets/images/coinLogo.png";

const QuestionCard = ({ question, width = 347, height = 209 }) => {
	return (
		<>
			<div style={{ width, height }}>
				<button>
					<div className="flex relative flex-col">
						<div
							className="absolute z-10 text-white font-Lalezar text-3xl"
							style={{
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
							}}
						>
							<p>{question}</p>
						</div>
						<div className="absolute bottom-0 right-0 flex items-center ">
							<span className="text-white font-Lalezar text-xl">پانداکوین</span>
							<span className="text-white font-Lalezar text-3xl">000</span>
							<img src={coinLogo} alt="coinLogo" />
						</div>
						<img src={questionBox} alt="questionBox" />
					</div>
				</button>
			</div>
		</>
	);
};

QuestionCard.propTypes = {
	question: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

export default QuestionCard;
