import React from "react";
import { useParams } from "react-router-dom";
import { CategoryFilter } from "../../components";
import { PostDetail } from "../../components";

const News = () => {
	const { newsId } = useParams();

	const GetData = () => {
		const newsData = {
			id: 1,
			title: "گزارشات مردمی مبنای دستگیری هنجارشکنان درفردای چهارشنبه‌سوری",
			description:
				"معاون فرماندهی انتظامی تهران بزرگ گفت: افرادی که قصد برهم زدن نظم شهر را داشته باشند باید بدانند که اگر گزارشی از آن‌ها از سوی مردم، معتمدین محله یا سایر شهروندان به پلیس ارائه شود، پلیس پس از چهارشنبه‌سوری حتماً با آن‌ها برخورد خواهد کرد",
			image: "https://i.postimg.cc/h4LGD39C/sample.png",
			categories: ["همه موارد", "اخبار پلیس", "اخبار اجتماعی"],
			numberOfVisits: 100,
			coins: 100,
			date: new Date("2025-03-30").toLocaleDateString("fa-IR"),
			yesPercentage: 50,
			noPercentage: 50,
		};

		const usersData = [
			{
				id: 1,
				avatarNumber: 1,
				name: "نام کاربر",
				comment:
					"باید برای جشن گرفتن مراسم مون ارزش قایل شیم و بتونیم انجامشون بدیم ولی نه با ضرر زدن ...",
				likesNumber: 10,
				biography: "",
				transaction: 0,
				volume: 0,
				rank: 0,
				medals: [1, 2, 3],
			},
			{
				id: 2,
				avatarNumber: 2,
				name: "نام کاربر",
				comment: "نظر کاربر",
				likesNumber: 10,
				biography: "",
				transaction: 0,
				volume: 0,
				rank: 0,
				medals: [1, 2, 3],
			},
			{
				id: 3,
				avatarNumber: 3,
				name: "نام کاربر",
				comment: "نظر کاربر",
				likesNumber: 10,
				biography: "",
				transaction: 0,
				volume: 0,
				rank: 0,
				medals: [1, 2, 3],
			},
		];

		return (
			<>
				<PostDetail
					postData={newsData}
					usersData={usersData}
					isExchange={false}
				/>
			</>
		);
	};
	return (
		<>
			{!newsId ? (
				<>
					<CategoryFilter />
					{/* TODO: Complete other parts of news page here */}
				</>
			) : (
				GetData()
			)}
		</>
	);
};

export default News;
