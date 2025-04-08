import React from "react";
import PropTypes from "prop-types";
import coinLogo from "../../../assets/images/coinLogo.png";
import questionBox from "../../../assets/images/questionBox.png";
import { useNavigate } from "react-router-dom";

const QuestionCard = ({ question, width = 300, height = 160 }) => {
	const navigate = useNavigate();
	return (
		<>
			<div style={{ width, height }} className="mt-7">
				<button onClick={() => navigate(`/${question.id}`)}>
					<div className="flex relative flex-col">
						<div className="absolute z-10 text-white font-MorabbaMedium text-lg top-5 right-5">
							<p>{question.title}</p>
						</div>
						<div className="absolute bottom-0 right-0 flex items-center flex-row gap-1">
							<span className="text-white font-MorabbaMedium text-lg">
								پانداکوین&nbsp;
							</span>
							<span className="text-white font-MorabbaMedium text-lg">
								{question.coin.toLocaleString("fa")}
							</span>
							<div>
								<img src={coinLogo} alt="coinLogo" />
							</div>
						</div>
						<img src={questionBox} alt="questionBox" />
					</div>
				</button>
			</div>
		</>
	);
};

QuestionCard.propTypes = {
	question: PropTypes.object.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

export default QuestionCard;
