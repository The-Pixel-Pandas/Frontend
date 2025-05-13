import * as Yup from "yup";

class UserInfoYup {
	constructor() {
		this.initialValues = {
			avatarSelected: false,
			username: "",
			job: "",
			age: "",
			gender: "",
			biography: "",
			location: "",
			favoriteTopic: "",
		};
		this.validationSchema = Yup.object({
			username: Yup.string().required("نام کاربری خود را وارد کنید "),
			job: Yup.string().required(" شغل خود را وارد کنید "),
			age: Yup.string().required(" سن خود را وارد کنید "),
			gender: Yup.string().required(" جنسیت خود را وارد کنید "),
			biography: Yup.string().required(" بیوگرافی خود را وارد کنید "),
			location: Yup.string().required(" محل زندگی خود را وارد کنید "),
			favoriteTopic: Yup.string().required(
				" موضوع مورد علاقه خود را وارد کنید "
			),
		});
	}
}

const userInfoYup = new UserInfoYup();
export default userInfoYup;
