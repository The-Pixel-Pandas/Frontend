import React from "react";
import { useParams } from "react-router-dom";
import { CategoryFilter, DataContainer } from "../../components";
import sample from "../../assets/images/DataImages/sample.png";

const News = () => {
	const { newsId } = useParams();
	return (
		<>
			<CategoryFilter />

			<DataContainer
				width={1248}
				height={324.58}
				title="گزارشات مردمی مبنای دستگیری هنجارشکنان درفردای چهارشنبه‌سوری"
				description="معاون فرماندهی انتظامی تهران بزرگ گفت: افرادی که قصد برهم زدن نظم شهر را داشته باشند باید بدانند که اگر گزارشی از آن‌ها از سوی مردم، معتمدین محله یا سایر شهروندان به پلیس ارائه شود، پلیس پس از چهارشنبه‌سوری حتماً با آن‌ها برخورد خواهد کرد"
				image={sample}
				categories={["همه موارد", "اخبار پلیس", "اخبار اجتماعی"]}
				numberOfVisits={100}
				coins={100}
				date={new Date("2025-03-30").toLocaleDateString('fa-IR')}
			/>
		</>
	);
};

export default News;
