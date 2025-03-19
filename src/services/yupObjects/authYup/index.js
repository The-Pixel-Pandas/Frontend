import * as Yup from "yup";

class AuthYup {
	constructor() {
		this.initialValues = {
			email: "",
			password: "",
		};
		this.validationSchema = Yup.object({
			email: Yup.string()
				.email("فرمت ایمیل صحیح نیست")
				.required("ایمیل را وارد کنید"),
			password: Yup.string().required("پسورد را وارد کنید"),
		});
	}
}

const authYup = new AuthYup();
export default authYup;
