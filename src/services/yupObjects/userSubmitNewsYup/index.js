import * as Yup from "yup";

class UserSubmitNewsYup {
	constructor() {
		this.initialValues = {
			news: "",
			news_description: "",
			news_tag: "",
		};
		this.validationSchema = Yup.object({
			news: Yup.string()
				.min(10, "خبر باید حداقل ده کاراکتر داشته باشد")
				.max(200, "خبر باید حداکثر دویست کاراکتر داشته باشد")
				.required("لطفا خبر خود را وارد کنید"),
			news_description: Yup.string()
				.min(10, "توضیحات باید حداقل ده کاراکتر داشته باشد")
				.max(200, "توضیحات باید حداکثر دویست کاراکتر داشته باشد")
				.required("لطفا توضیحات خود را وارد کنید"),
			news_tag: Yup.string()
				.matches(
					/^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]{2,}$/,
					"تگ باید فقط یک کلمه باشد"
				)
				.min(2, "تگ باید حداقل دو حرف داشته باشد")
				.max(100, "تگ باید حداکثر صد حرف داشته باشد")
				.required("لطفا تگ خود را وارد کنید"),
		});
	}
}

const userSubmitNewsYup = new UserSubmitNewsYup();
export default userSubmitNewsYup;
