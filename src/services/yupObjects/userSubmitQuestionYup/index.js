import * as Yup from "yup";

class UserSubmitQuestionYup {
	constructor() {
		this.initialValues = {
			question: "",
			description: "",
			coin: 0,
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
			coin: Yup.number()
				.min(10, "مقدار پاداش باید حداقل ده پاندا کوین داشته باشد")
				.max(100, "مقدار پاداش باید حداکثر صد پاندا کوین داشته باشد")
				.required(""),
		});
	}
}

const userSubmitQuestionYup = new UserSubmitQuestionYup();
export default userSubmitQuestionYup;
