import * as Yup from "yup";

class UserInfoYup {
	constructor() {
		this.initialValues = {
			username: "",
			job: "",
			age: "",
			biography: "",
			location: "",
		};
		this.validationSchema = Yup.object({
			username: Yup.string().required("نام کاربری خود را وارد کنید "),
			job: Yup.string().required(" شغل خود را وارد کنید "),
			age: Yup.string().required(" سن خود را وارد کنید "),
			biography: Yup.string().required(" بیوگرافی خود را وارد کنید "),
			location: Yup.string().required(" محل زندگی خود را وارد کنید "),
		});
	}
}

const userInfoYup = new UserInfoYup();
export default userInfoYup;
