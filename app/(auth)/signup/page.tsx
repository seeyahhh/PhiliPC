'use client';

import React, { JSX, useActionState, useState, useTransition } from 'react';
import Link from 'next/link';
import { signup, SignupState } from './actions';
import Image from 'next/image';

{
    /* Navigation: Pagination & Arrows */
}
const SignupNavigation = ({
    page,
    onNext,
    onPrev,
}: {
    page: number;
    onNext: () => void;
    onPrev: () => void;
}): JSX.Element => {
    return (
        <div className="flex flex-col items-center pt-3">
            <div className="flex items-center justify-center gap-6 text-2xl">
                {page === 1 ? (
                    <span className="opacity-30 select-none">←</span>
                ) : (
                    <button
                        type="button"
                        className="cursor-pointer hover:text-blue-600"
                        onClick={onPrev}
                    >
                        ←
                    </button>
                )}

                <div className="flex items-center gap-2">
                    <div
                        className={`h-2 w-2 rounded-full ${page === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}
                    ></div>
                    <div
                        className={`h-2 w-2 rounded-full ${page === 2 ? 'bg-blue-600' : 'bg-gray-300'}`}
                    ></div>
                    <div
                        className={`h-2 w-2 rounded-full ${page === 3 ? 'bg-blue-600' : 'bg-gray-300'}`}
                    ></div>
                </div>

                {page === 3 ? (
                    <span className="opacity-30 select-none">→</span>
                ) : (
                    <button
                        type="button"
                        className="cursor-pointer hover:text-blue-600"
                        onClick={onNext}
                    >
                        →
                    </button>
                )}
            </div>
        </div>
    );
};

const SignupPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [isPending, startTransition] = useTransition();
    const [passwordError, setPasswordError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactNo: '',
        fbLink: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [state, signupAction] = useActionState<SignupState, FormData>(signup, undefined);

    const updateField = (field: keyof typeof formData, value: string): void => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === 'password' || field === 'confirmPassword') {
            setPasswordError('');
        }
    };

    const getError = (field: string): string | undefined => {
        if (!state?.errors) return undefined;
        const errors = state.errors as Record<string, string[] | undefined>;
        return errors[field]?.[0];
    };

    const nextPage = (): void => setPage((p) => p + 1);
    const prevPage = (): void => setPage((p) => p - 1);

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        const data = new FormData();
        data.append('first_name', formData.firstName);
        data.append('last_name', formData.lastName);
        data.append('contact_no', formData.contactNo);
        data.append('fb_link', formData.fbLink);
        data.append('email', formData.email);
        data.append('username', formData.username);
        data.append('password', formData.password);
        data.append('confirm_password', formData.confirmPassword);

        startTransition(() => {
            signupAction(data);
        });
    };

    return (
        <div className="relative bottom-10 z-10 m-auto flex w-full max-w-md flex-col rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-center text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl">
                Create Account!
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                {state?.errors?.general && (
                    <div className="rounded-md bg-red-50 p-3">
                        <p className="text-sm text-red-800">{state.errors.general[0]}</p>
                    </div>
                )}

                {page === 1 && (
                    <>
                        {/* First Name Input */}
                        <div className="relative">
                            <input
                                id="first_name"
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={(e) => updateField('firstName', e.target.value)}
                                placeholder=" "
                                className="focus:outline-primary focus:border-primary peer z-5 block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm hover:cursor-text focus:ring-0"
                            />
                            <label
                                htmlFor="first_name"
                                className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                            >
                                First Name
                            </label>
                            {getError('first_name') && (
                                <p className="mt-1 text-xs text-red-600">
                                    {getError('first_name')}
                                </p>
                            )}
                        </div>

                        {/* Last Name Input */}
                        <div className="relative">
                            <input
                                id="last_name"
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={(e) => updateField('lastName', e.target.value)}
                                placeholder=" "
                                className="focus:outline-primary focus:border-primary peer z-5 block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm hover:cursor-text focus:ring-0"
                            />
                            <label
                                htmlFor="last_name"
                                className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                            >
                                Last Name
                            </label>
                            {getError('last_name') && (
                                <p className="mt-1 text-xs text-red-600">{getError('last_name')}</p>
                            )}
                        </div>

                        {/* Contact No. Input */}
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/ph_flag.svg"
                                    alt="Philippines Flag"
                                    width={24}
                                    height={24}
                                />
                                <span className="text-sm text-gray-700">+63</span>
                            </div>

                            <div className="relative w-full">
                                <input
                                    id="contact_no"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    maxLength={10}
                                    value={formData.contactNo}
                                    onChange={(e) => updateField('contactNo', e.target.value)}
                                    placeholder=" "
                                    className="focus:outline-primary focus:border-primary peer z-5 block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm hover:cursor-text focus:ring-0"
                                />
                                <label
                                    htmlFor="contact_no"
                                    className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                                >
                                    Contact No.
                                </label>
                                {getError('contact_no') && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {getError('contact_no')}
                                    </p>
                                )}
                            </div>
                        </div>

                        <SignupNavigation
                            page={page}
                            onNext={nextPage}
                            onPrev={prevPage}
                        />
                    </>
                )}

                {page === 2 && (
                    <>
                        {/* FB Link Input */}
                        <div className="relative">
                            <input
                                id="fb_link"
                                type="url"
                                value={formData.fbLink}
                                onChange={(e) => updateField('fbLink', e.target.value)}
                                placeholder=" "
                                className="focus:outline-primary focus:border-primary peer z-5 block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm hover:cursor-text focus:ring-0"
                            />
                            <label
                                htmlFor="fb_link"
                                className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                            >
                                Facebook Link (Optional)
                            </label>
                            {getError('fb_link') && (
                                <p className="mt-1 text-xs text-red-600">{getError('fb_link')}</p>
                            )}
                        </div>

                        <SignupNavigation
                            page={page}
                            onNext={nextPage}
                            onPrev={prevPage}
                        />
                    </>
                )}

                {page === 3 && (
                    <>
                        {/* Email Input */}
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                placeholder=" "
                                className="focus:outline-primary focus:border-primary peer z-5 block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm hover:cursor-text focus:ring-0"
                            />
                            <label
                                htmlFor="email"
                                className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                            >
                                Email Address
                            </label>
                            {getError('email') && (
                                <p className="mt-1 text-xs text-red-600">{getError('email')}</p>
                            )}
                        </div>

                        {/* Username Input */}
                        <div className="relative">
                            <input
                                id="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => updateField('username', e.target.value)}
                                placeholder=" "
                                className="focus:outline-primary focus:border-primary peer z-5 block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm hover:cursor-text focus:ring-0"
                            />
                            <label
                                htmlFor="username"
                                className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                            >
                                Username
                            </label>
                            {getError('username') && (
                                <p className="mt-1 text-xs text-red-600">{getError('username')}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => updateField('password', e.target.value)}
                                placeholder=" "
                                className="focus:outline-primary focus:border-primary peer z-5 block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm hover:cursor-text focus:ring-0"
                            />
                            <label
                                htmlFor="password"
                                className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                            >
                                Password
                            </label>
                            {getError('password') && (
                                <p className="mt-1 text-xs text-red-600">{getError('password')}</p>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <input
                                id="confirm_password"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => updateField('confirmPassword', e.target.value)}
                                placeholder=" "
                                className="focus:outline-primary focus:border-primary peer z-5 block w-full rounded-md border border-gray-300 bg-transparent px-2 py-2.5 pt-5 text-sm text-gray-900 shadow-sm hover:cursor-text focus:ring-0"
                            />
                            <label
                                htmlFor="confirm_password"
                                className="text-neutral peer-focus:text-primary absolute top-3 z-10 origin-left -translate-y-2 scale-75 transform px-3 text-sm duration-300 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-2 peer-focus:scale-75 hover:cursor-text rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:dark:text-blue-500"
                            >
                                Confirm Password
                            </label>
                            {(passwordError || getError('confirm_password')) && (
                                <p className="mt-1 text-xs text-red-600">
                                    {passwordError || getError('confirm_password')}
                                </p>
                            )}
                        </div>

                        <SignupNavigation
                            page={page}
                            onNext={nextPage}
                            onPrev={prevPage}
                        />

                        <button
                            type="submit"
                            disabled={isPending}
                            className="mt-6 flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </>
                )}

                <p className="text-center text-xs text-gray-600">
                    Already have an account?
                    <Link
                        href="/login"
                        className="ml-1 rounded-xl border border-gray-300 p-2 font-semibold text-blue-600 shadow-md hover:bg-gray-100"
                    >
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
