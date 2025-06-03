import * as Yup from "yup";

class AdminSubmitTaskYup {
	constructor() {
		this.initialValues = {
			title: "",
			description: "",
			coin: 0,
		};
		this.validationSchema = Yup.object({
			title: Yup.string()
				.min(10, "عنوان تسک باید حداقل ده کاراکتر داشته باشد")
				.max(100, "عنوان تسک باید حداکثر صد کاراکتر داشته باشد")
				.required("لطفا عنوان تسک خود را وارد کنید"),
			description: Yup.string()
				.min(10, "توضیحات باید حداقل ده کاراکتر داشته باشد")
				.max(200, "توضیحات باید حداکثر دویست کاراکتر داشته باشد")
				.required("لطفا توضیحات خود را وارد کنید"),
			coin: Yup.number()
				.min(10, "مقدار پاداش باید حداقل ده پاندا کوین داشته باشد")
				.max(100, "مقدار پاداش باید حداکثر صد پاندا کوین داشته باشد")
				.required(" "),
		});
	}
}

const adminSubmitTaskYup = new AdminSubmitTaskYup();
export default adminSubmitTaskYup;
