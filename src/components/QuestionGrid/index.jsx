import React from "react";
import QuestionCard from "../QuestionCard";
import PropTypes from "prop-types";
//import { useQuestionStore } from "../../services";

const QuestionGrid = ({ questions }) => {
	//const { questions } = useQuestionStore();

	return (
		<div className="grid grid-cols-4 ml-24 mr-24 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
			{questions.map((q, index) => (
				<QuestionCard key={index} question={q} />
			))}
		</div>
	);
};

QuestionGrid.propTypes = {
	questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuestionGrid;
