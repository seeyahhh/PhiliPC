"use client";

<<<<<<< HEAD
import { useState } from "react";
import Link from "next/link";

const SignupPage = () => {
	const [fullName, setFullname] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
=======
import { useState, useActionState } from 'react';
import { signup } from '../signup/actions'
import Link from 'next/link';

const SignupPage: React.FC = () => {
    const [fullName, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [state, action] = useActionState(signup, undefined);
>>>>>>> 100787c (feat(app): add fetching of all products and specific products from db)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Logging in with:", { username, password });
		// connect to backend
	};

<<<<<<< HEAD
	return (
		<>
			<div className="flex flex-col m-auto bottom-10 w-full max-w-md rounded-lg bg-white p-8 shadow-md relative z-10">
				<h2 className="mb-6 text-center text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
					{" "}
					Create Account!
				</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Full Name Input */}
					<div className="relative z-0">
						<input
							id="fullName"
							name="fullName"
							type="fullName"
							autoComplete="fullName"
							required
							value={fullName}
							onChange={(e) => setFullname(e.target.value)}
							placeholder=" "
							className="block py-2.5 pt-5 px-2 w-full text-sm text-gray-900 bg-transparent border rounded-md z-5 hover:cursor-text border-gray-300 shadow-sm focus:outline-primary focus:ring-0 focus:border-primary peer"
						/>
						<label
							htmlFor="fullName"
							className="absolute text-sm px-3 text-neutral duration-300 transform -translate-y-2 scale-75 top-3 z-10 hover:cursor-text origin-left peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
							Full Name
						</label>
					</div>

					{/* Username Input */}
					<div className="relative z-0">
						<input
							id="username"
							name="username"
							type="username"
							autoComplete="username"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder=" "
							className="block py-2.5 pt-5 px-2 w-full text-sm text-gray-900 bg-transparent border rounded-md z-5 hover:cursor-text border-gray-300 shadow-sm focus:outline-primary focus:ring-0 focus:border-primary peer"
						/>
						<label
							htmlFor="username"
							className="absolute text-sm px-3 text-neutral duration-300 transform -translate-y-2 scale-75 top-3 z-10 hover:cursor-text origin-left peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
							Username
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
							className="absolute text-sm px-3 text-neutral duration-300 transform -translate-y-2 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
							Password
						</label>
					</div>
=======
    return (
        <>
            <div className="relative bottom-10 z-10 m-auto flex w-full max-w-md flex-col rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl">
                    Create Account!
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Full Name Input */}
                    <div className="relative z-0">
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            required
                            value={fullName}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder=" "
                            className="focus:outline-primary focus:border-primary peer z-5 block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm hover:cursor-text focus:ring-0"
                        />
                        {state?.errors?.name && <p>{state.errors.name}</p>}
                        <label
                            htmlFor="fullName"
                            className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                        >
                            Full Name
                        </label>
                    </div>

                    {/* Username Input */}
                    <div className="relative z-0">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder=" "
                            className="focus:outline-primary focus:border-primary peer z-5 block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm hover:cursor-text focus:ring-0"
                        />
                        {state?.errors?.email && <p>{state.errors.email}</p>}
                        <label
                            htmlFor="username"
                            className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                        >
                            Username
                        </label>
                    </div>

                    {/* Password Input */}
                    <div className="relative z-0">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" "
                            className="focus:outline-primary focus:border-primary peer block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm focus:ring-0"
                        />
                        {state?.errors?.password && <p>{state.errors.password}</p>}
                        <label
                            htmlFor="password"
                            className="text-neutral peer-focus:text-primary absolute top-3 -z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                        >
                            Password
                        </label>
                    </div>
>>>>>>> 100787c (feat(app): add fetching of all products and specific products from db)

					{/* Submit Button */}
					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
							Sign Up
						</button>
					</div>
					<p className="text-neutral text-xs text-center">
						Already have an account?
						<Link
							href="/login"
							className="text-primary font-semibold ml-1 p-2 shadow-md border border-gray-300 hover:bg-gray-100 rounded-xl">
							Log in
						</Link>
					</p>
				</form>
			</div>
			<hr />
			<p className="text-neutral text-xs text-center">
				By signing up, you agree to PhiliPC&apos;s <Link href='/signup' className="underline font-semibold">Terms of Service & Privacy Policy</Link>
			</p>
		</>
	);
};

export default SignupPage;
