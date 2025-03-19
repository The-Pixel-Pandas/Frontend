import React from "react";
import { useState } from "react";
import authInput from "../../assets/images/authInput.png";
import { useFormik } from "formik";
import { authYup } from "../../services";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../services";

const AuthForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { setUser } = useAuthStore();

	const formik = useFormik({
		initialValues: authYup.initialValues,
		validationSchema: authYup.validationSchema,
		onSubmit: (values) => {
			console.log(values);
			setUser(values.email, values.password);
			navigate("/");
		},
	});

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<div className="relative mt-6" style={{ width: 411, height: 61 }}>
					<input
						type="email"
						className="placeholder:text-white text-white font-MorabbaMedium text-xl px-4 py-3 bg-transparent relative z-10 focus:outline-none"
						dir="rtl"
						placeholder="ایمیل"
						style={{ width: 411, height: 61 }}
						{...formik.getFieldProps("email")}
						onChange={(e) => {
							formik.errors.email && formik.setFieldError("email", "");
							formik.handleChange(e);
						}}
					/>
					<img
						src={authInput}
						alt="Input background"
						className="absolute top-0 left-0 w-full h-full z-0"
					/>
					{formik.touched.email && formik.errors.email && (
						<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-red-500 text-sm">
							{formik.errors.email}
						</div>
					)}
				</div>

				<div className="relative mt-4" style={{ width: 411, height: 61 }}>
					<input
						type={showPassword ? "text" : "password"}
						className="placeholder:text-white text-white font-MorabbaMedium text-xl px-4 py-3 bg-transparent relative z-10 focus:outline-none w-full h-full"
						dir="rtl"
						placeholder="پسورد"
						style={{ width: 411, height: 61 }}
						{...formik.getFieldProps("password")}
						onChange={(e) => {
							formik.errors.password && formik.setFieldError("password", "");
							formik.handleChange(e);
						}}
					/>
					<img
						src={authInput}
						alt="Input background"
						className="absolute top-0 left-0 w-full h-full z-0"
					/>
					{formik.touched.password && formik.errors.password && (
						<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-red-500 text-sm">
							{formik.errors.password}
						</div>
					)}
					<button
						type="submit"
						onClick={togglePasswordVisibility}
						className="absolute inset-y-0 left-0.5 flex items-center px-3 text-white z-20"
					>
						{showPassword ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
								/>
							</svg>
						)}
					</button>
				</div>
			</form>
		</>
	);
};

export default AuthForm;
