import * as Yup from "yup";

class UserInfoYup {
	constructor() {
		this.initialValues = {
			username: "",
			job: "",
			age: 0,
			biography: "",
			location: "",
		};
		this.validationSchema = Yup.object({
			username: Yup.string()
				.min(3, "نام کاربری باید حداقل سه کاراکتر داشته باشد")
				.max(20, "نام کاربری باید حداکثر بیست کاراکتر داشته باشد")
				.required(" نام کاربری خود را وارد کنید "),
			job: Yup.string()
				.min(3, "شغل باید حداقل سه کاراکتر داشته باشد")
				.max(20, "شغل باید حداکثر بیست کاراکتر داشته باشد")
				.required(" شغل خود را وارد کنید "),
			age: Yup.number()
				.typeError("سن باید عدد باشد")
				.positive("سن نمی تواند منفی باشد")
				.integer("سن باید عدد صحیح باشد")
				.min(18, "سن باید حداقل 18 سال باشد")
				.max(100, "سن باید حداکثر 100 سال باشد")
				.required(" سن خود را وارد کنید "),
			biography: Yup.string()
				.min(10, "بیوگرافی باید حداقل ده کاراکتر داشته باشد")
				.max(200, "بیوگرافی باید حداکثر دویست کاراکتر داشته باشد")
				.required(" بیوگرافی خود را وارد کنید "),
			location: Yup.string()
				.min(3, "محل زندگی باید حداقل سه کاراکتر داشته باشد")
				.max(50, "محل زندگی باید حداکثر پنجاه کاراکتر داشته باشد")
				.required(" محل زندگی خود را وارد کنید "),
		});
	}
}

const userInfoYup = new UserInfoYup();
export default userInfoYup;
