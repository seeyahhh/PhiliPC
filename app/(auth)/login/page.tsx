'use client';

import React, { useActionState, useState } from 'react';
import Link from 'next/link';
import { login, LoginState } from './actions';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRemembered, setIsRemembered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [state, loginAction] = useActionState<LoginState, FormData>(login, undefined);

    return (
        <>
            <div className="relative z-10 mt-10 flex w-full max-w-md flex-col rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl">
                    Welcome Back!
                </h2>
                <form
                    action={loginAction}
                    className="space-y-6"
                >
                    {/* Username/Email Input */}
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
                        <label
                            htmlFor="username"
                            className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                        >
                            Username or Email
                        </label>
                        {state?.errors?.username && (
                            <p className="mt-1 text-xs text-red-600">{state.errors.username[0]}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="relative z-0">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" "
                            className="focus:outline-primary focus:border-primary peer block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 pr-10 text-sm text-gray-900 shadow-sm focus:ring-0"
                        />
                        <label
                            htmlFor="password"
                            className="text-neutral peer-focus:text-primary absolute top-3 -z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                        >
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            )}
                        </button>
                        {state?.errors?.password && (
                            <p className="mt-1 text-xs text-red-600">{state.errors.password[0]}</p>
                        )}
                    </div>

                    {/* Remember me Checkbox */}
                    <div className="flex gap-3">
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            checked={isRemembered}
                            onChange={() => setIsRemembered(!isRemembered)}
                            className="peer w-4"
                        />
                        <label
                            htmlFor="remember"
                            className={`text-xs hover:cursor-pointer md:text-sm ${
                                isRemembered ? 'text-primary' : 'text-neutral'
                            }`}
                        >
                            Remember Me
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="bg-primary flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                        >
                            Log in
                        </button>
                    </div>
                    <p className="text-neutral text-center text-xs">
                        Don&apos;t have an account yet?
                        <Link
                            href="/signup"
                            className="text-primary ml-1 rounded-xl border border-gray-300 p-2 font-semibold shadow-md hover:bg-gray-100"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
