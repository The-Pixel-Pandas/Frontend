import * as Yup from "yup";

class AdminSubmitTaskYup {
	constructor() {
		this.initialValues = {
			title: "",
			description: "",
			link: "",
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
			link: Yup.string()
				.min(10, "لینک باید حداقل ده کاراکتر داشته باشد")
				.max(50, "لینک باید حداکثر پنجاه کاراکتر داشته باشد")
				.required("لطفا لینک خود را وارد کنید"),
			coin: Yup.number()
				.min(100, "مقدار حجم پاداش باید حداقل صد پاندا کوین داشته باشد")
				.max(10000, "مقدار حجم پاداش باید حداکثر ده هزار پاندا کوین داشته باشد")
				.required(" "),
		});
	}
}

const adminSubmitTaskYup = new AdminSubmitTaskYup();
export default adminSubmitTaskYup;
