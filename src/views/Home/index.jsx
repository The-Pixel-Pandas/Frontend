import React from "react";
import { QuestionCard, Navbar } from "../../components";


const Home = () => {
	//const questions = ["سوال 1", "سوال 2", "سوال 3", "سوال 4", "سوال 5"];
	return (
		<>
			<Navbar/>
			{/* <CategoryFilter onSelect={() => {}} /> */}
			<QuestionCard question="سوال 1" />
			{/* <QuestionGrid questions={questions} /> */}

			{/* see all font styles. remove later */}
			{/* <div className="flex flex-col flex-auto text-white justify-center items-center">
				<div className="font-Lalezar">پانداهای پیکسلی</div>
				<div className="font-InterMedium"> پانداهای پیکسلی</div>
				<div className="font-MorabbaBlack">پانداهای پیکسلی</div>
				<div className="font-MorabbaBold">پانداهای پیکسلی</div>
				<div className="font-MorabbaExtraBold">پانداهای پیکسلی</div>
				<div className="font-MorabbaHeavy">پانداهای پیکسلی</div>
				<div className="font-MorabbaLight">پانداهای پیکسلی</div>
				<div className="font-MorabbaMedium">پانداهای پیکسلی</div>
				<div className="font-MorabbaRegular">پانداهای پیکسلی</div>
				<div className="font-MorabbaSemiBold">پانداهای پیکسلی</div>
				<div className="font-MorabbaUltraLight">پانداهای پیکسلی</div>
			</div> */}
		</>
	);
};

export default Home;
