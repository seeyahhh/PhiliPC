"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isRemembered, setIsRemembered] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Logging in with:", { username, password });
		// connect to backend
	};

	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
			<div className="hidden lg:flex items-center justify-center bg-[url('/images/form-bg.jpg')] bg-cover bg-center">
				<div className="max-w-lg text-white px-5">
					<h2 className="text-4xl font-extrabold">Frontend na maangas</h2>
					<p className="mt-4 text-lg opacity-90">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem modi repudiandae vel eum magni
						natus.
					</p>
					<div className="mt-8 w-full rounded-md shadow-xl overflow-hidden"></div>
				</div>
			</div>

			<div className="flex relative flex-col items-center gap-10 p-10 pt-20">
				<div className="w-60 h-15 lg:w-85 lg:h-20 relative">
					<Image src="/logo.svg" alt="PhiliPC Logo" fill priority className="object-contain" />
				</div>
				<div className="flex flex-col m-auto bottom-10 w-full max-w-md rounded-lg bg-white p-8 shadow-md relative z-10">
					<h2 className="mb-6 text-center text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
						{" "}
						Welcome Back!
					</h2>
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Email Input */}
						<div className="relative z-0">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder=" "
								className="block py-2.5 pt-5 px-2 w-full text-sm text-gray-900 bg-transparent border rounded-md z-5 hover:cursor-text border-gray-300 shadow-sm focus:outline-primary focus:ring-0 focus:border-primary peer"
							/>
							<label
								htmlFor="email"
								className="absolute text-sm px-3 text-gray-500 duration-300 transform -translate-y-2 scale-75 top-3 z-10 hover:cursor-text origin-left peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
								Email address
							</label>
						</div>

						{/* Password Input */}
						<div className="relative z-0">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder=" "
								className="block py-2.5 pt-5 px-2 w-full text-sm text-gray-900 bg-transparent border rounded-md border-gray-300 shadow-sm focus:outline-primary focus:ring-0 focus:border-primary peer"
							/>
							<label
								htmlFor="password"
								className="absolute text-sm px-3 text-gray-500 duration-300 transform -translate-y-2 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
								Password
							</label>
						</div>

						{/* Remember me Checkbox */}
						<div className="flex gap-3">
							<input
								type="checkbox"
								name="remember"
								id="remember"
								checked={isRemembered}
								onChange={() => setIsRemembered(!isRemembered)}
								className="w-4 peer"
							/>
							<label
								htmlFor="remember"
								className={`lg:text-sm ${isRemembered ? "text-primary" : "text-gray-700"}`}>
								Remember Me
							</label>
						</div>
						{/* Submit Button */}
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
								Log in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
