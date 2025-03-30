import React from "react";
import { useParams } from "react-router-dom";
import { CategoryFilter, DataContainer, Comment } from "../../components";

const News = () => {
	const { newsId } = useParams();
	return (
		<>
			<CategoryFilter />

			<DataContainer
				width={1208}
				height={290}
				title="گزارشات مردمی مبنای دستگیری هنجارشکنان درفردای چهارشنبه‌سوری"
				description="معاون فرماندهی انتظامی تهران بزرگ گفت: افرادی که قصد برهم زدن نظم شهر را داشته باشند باید بدانند که اگر گزارشی از آن‌ها از سوی مردم، معتمدین محله یا سایر شهروندان به پلیس ارائه شود، پلیس پس از چهارشنبه‌سوری حتماً با آن‌ها برخورد خواهد کرد"
				image={"https://i.postimg.cc/h4LGD39C/sample.png"}
				categories={["همه موارد", "اخبار پلیس", "اخبار اجتماعی"]}
				numberOfVisits={100}
				coins={100}
				date={new Date("2025-03-30").toLocaleDateString("fa-IR")}
			/>
			<div className="mt-10 mr-40">
				<Comment
					users={[
						{
							avatar: "https://i.postimg.cc/h4LGD39C/sample.png",
							name: "نام کاربر",
							comment: "نظر کاربر",
						},
					]}
				/>
			</div>
		</>
	);
};

export default News;
