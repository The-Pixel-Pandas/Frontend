import * as Yup from "yup";

class UserSubmitQuestionYup {
	constructor() {
		this.initialValues = {
			question: "",
			description: "",
			tag: "",
		};
		this.validationSchema = Yup.object({
			question: Yup.string()
				.min(10, "سوال باید حداقل ده کاراکتر داشته باشد")
				.max(200, "سوال باید حداکثر دویست کاراکتر داشته باشد")
				.required("لطفا سوال خود را وارد کنید"),
			description: Yup.string()
				.min(10, "توضیحات باید حداقل ده کاراکتر داشته باشد")
				.max(200, "توضیحات باید حداکثر دویست کاراکتر داشته باشد")
				.required("لطفا توضیحات خود را وارد کنید"),
			tag: Yup.string()
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

const userSubmitQuestionYup = new UserSubmitQuestionYup();
export default userSubmitQuestionYup;
