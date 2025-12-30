'use client';

import React, { useState, useActionState } from 'react';
import { UserSession, User } from '@/app/data/types';
import Navigation from '@/app/components/Navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CircleUser, Upload } from 'lucide-react';
import Footer from '@/app/components/Footer';

// etong function na to laman yung galing sa lib/queries, which is yung gumagawa ng sql update mismo
import { update, UpdateUserState } from './actions';

// fetch natin yung user information then display sa page, then lagay tayo ng parang button na maglalabas ng input thingy para maedit na yung page ganun

const CreateSettingsPage: React.FC = () => {
    const [user, setUser] = useState<UserSession | null>(null);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [id, setId] = useState<number | null>();
    const initialState: UpdateUserState = { success: false };
    const [state, formAction, isPending] = useActionState<UpdateUserState, FormData>(
        update,
        initialState
    );
    const [editableFields, setEditableFields] = useState<{ [key: string]: boolean }>(
        { 
            email: false, 
            contact_no: false,
            password: false,
        }
    )

    const [inputContent, setInputContent] = useState<{ [key: string]: string | undefined }>({
        email: "",
        contact_no: "",
        password: ""
    });
    // fetching session
    React.useEffect(() => {
        const fetchUser = async (): Promise<void> => {
            try {
                const response = await fetch('/api/session');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user || null);
                    setId(data.user.user_id || null);
                }
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        fetchUser();
    }, []);

    // using id from session to fetch all user information to display on the page.
    const fetchUserInfo = React.useEffect(() => {
        if (!user?.username) return;

        const fetchUserInfo = async (): Promise<void> => {
            try {
                const response = await fetch(`/api/users/${user?.username}`);
                if (response.ok) {
                    const data = await response.json();
                    const userData = data?.data?.user || null;
                    setUserInfo(userData || null);
                    setInputContent(prev => ({
                        ...prev,
                        email: userData?.email,
                        contact_no: userData?.contact_no,
                        password: userData?.password,
                    }))
                }
            } catch (err) {
                console.error('Failed to fetch user info', err);
            }
        };

        fetchUserInfo();
    }, [user, state?.success]);

    const enableInput = (inputId: string) => {
       setEditableFields(prev => ({
        ...prev,
        [inputId]: true
       }));
    }

    const cancelChanges = (inputId: string) => {
        setInputContent(prev => ({
            ...prev,
            [inputId]: userInfo ? (userInfo[inputId as keyof User] as string) : "",
        }));

        console.log(inputContent[inputId]);
        setEditableFields(prev => ({
            ...prev,
            [inputId]: false
        }));
    }

    return (
        <>
            <Navigation />
            <div className="dark:bg-gray-8000 flex min-h-screen w-full">
                <div className="w-2/5 bg-[#DEDEDE] p-10 pt-10">
                    <div className="flex items-center">
                        <Link
                            className="hover:cursor-pointer"
                            href={'/'}
                        >
                            <ArrowLeft />
                        </Link>
                        <h1 className="ml-10 text-3xl font-bold text-gray-900">Settings</h1>
                    </div>
                    <div>
                        <h2 className="mt-15 mb-5 text-2xl text-gray-900">Edit Profile</h2>
                    </div>
                </div>

                {/**Account Details container */}
                <div className="mx-25 w-full pt-10">
                    <form action={formAction}>
                        <h1 className="text-3xl font-bold text-gray-900"> Edit Profile</h1>

                        <h2 className="mt-15 mb-5 text-2xl font-bold text-gray-900">
                            {' '}
                            Profile Picture
                        </h2>
                        <div className="flex items-center">
                            <div>
                                {/** insert conditional here para pag may pfp yun yung ididsplay imbes na yung circleuser */}
                                <CircleUser className="h-25 w-25" />
                            </div>
                            <div className="ml-20 flex rounded-3xl border border-gray-900 p-3">
                                <Upload />
                                <p className="ml-4">Upload Picture</p>
                            </div>
                        </div>

                        {/** Lagyan ng name attribute lahat ng inputs here */}

                        <h2 className="mt-15 mb-5 text-2xl font-bold text-gray-900">
                            Account Details
                        </h2>
                        <div className="grid grid-cols-6 grid-rows-3 gap-4">
                            <div className="col-span-6">
                                <p>Username</p>
                                <input
                                    name="username"
                                    defaultValue={userInfo?.username ?? undefined}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-300"
                                ></input>
                            </div>
                            <div className="col-span-3 row-start-2">
                                <p>First Name</p>
                                <input
                                    name="first_name"
                                    defaultValue={userInfo?.first_name ?? undefined}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-300"
                                ></input>
                            </div>
                            <div className="col-span-3 row-start-2">
                                <p>Last Name</p>
                                <input
                                    name="last_name"
                                    defaultValue={userInfo?.last_name ?? undefined}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-300"
                                ></input>
                            </div>
                            <div className="col-span-6 row-start-3">
                                <p>Facebook Link</p>
                                <input
                                    name="fb_link"
                                    defaultValue={userInfo?.fb_link ?? ""}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-300"
                                ></input>
                            </div>
                        </div>

                        {/** Private details, need ng parang 2nd prompt before ka makapagedit ng informaiton mo.  */}
                        <h2 className="mt-15 mb-5 text-2xl font-bold text-gray-900">
                            Private Details
                        </h2>
                        <div className="grid grid-cols-6 grid-rows-3 gap-4">
                            <div className="col-span-5">
                                <p>Email</p>
                                <div className="flex">
                                    <input
                                        readOnly={!editableFields.email}
                                        name="email"
                                        value={inputContent?.email ?? undefined}
                                        onChange={(e) => setInputContent(prev => ({ ...prev, email: e.target.value }))}
                                        className={`w-100 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-300
                                            ${!editableFields.email ? 'text-gray-400 pointer-events-none select-none' : 'text-black'}`}
                                    ></input> 
                                  
                                    <div className="col-span-2 flex content-center">
                                        {!editableFields.email ?  
                                            <button type="button" className="ml-10 flex content-center items-center hover: cursor-pointer" onClick={() => enableInput('email')}>
                                                Change
                                            </button> : 
                                            <div className="flex"> 
                                                <button type="button" className="ml-10 text-red-400 flex content-center items-center hover: cursor-pointer" onClick={() => cancelChanges('email')}>
                                                    Cancel
                                                </button>
                                                
                                                <button type="button" className="ml-10 text-green-400 flex content-center items-center hover: cursor-pointer" onClick={() => setEditableFields(prev => ({ ...prev, email: false }))}>
                                                    Save
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-5 row-start-2">
                                <p>Phone Number</p>
                                <div className="flex">
                                    <input
                                        readOnly={!editableFields.contact_no}
                                        name="contact_no"
                                        value={inputContent?.contact_no ?? undefined}
                                        onChange={(e) => setInputContent(prev => ({ ...prev, contact_no: e.target.value }))}
                                        className={`w-100 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-300
                                            ${!editableFields.contact_no ? 'text-gray-400 pointer-events-none select-none' : 'text-black'}`}
                                    ></input>
                                    <div className="col-span-1 flex content-center">
                                        {!editableFields.contact_no ?  
                                            <button type="button" className="ml-10 flex content-center items-center hover: cursor-pointer" onClick={() => enableInput('contact_no')}>
                                                Change
                                            </button> :
                                            <div className="flex"> 
                                                <button type="button" className="ml-10 text-red-400 flex content-center items-center hover: cursor-pointer" onClick={() => cancelChanges("contact_no")}>
                                                    Cancel
                                                </button>
                                                
                                                <button type="button" className="ml-10 text-green-400 flex content-center items-center hover: cursor-pointer" onClick={() => setEditableFields(prev => ({ ...prev, contact_no: false }))}>
                                                    Save
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-5 row-start-3">
                                <p>Password</p>
                                <div className="flex">
                                    <input
                                        type={!editableFields.password ? "password" : "text"}
                                        readOnly={!editableFields.password}
                                        name="password"
                                        value={inputContent?.password ?? undefined}
                                        onChange={(e) => setInputContent( prev => ({ ...prev, password: e.target.value }))}
                                        className={`w-100 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-300
                                            ${!editableFields.password ? 'text-gray-400 pointer-events-none select-none' : 'text-black'}`}
                                    ></input>
                                    <div className="col-span-1 flex content-center">
                                        {!editableFields.password ?  
                                            <button type="button" className="ml-10 flex content-center items-center hover: cursor-pointer" onClick={() => enableInput('password')}>
                                                Change
                                            </button> :
                                            <div className="flex"> 
                                                <button type="button" className="ml-10 text-red-400 flex content-center items-center hover: cursor-pointer" onClick={() => cancelChanges("password")}>
                                                    Cancel
                                                </button>
                                                
                                                <button type="button" className="ml-10 text-green-400 flex content-center items-center hover: cursor-pointer" onClick={() => setEditableFields(prev => ({ ...prev, password: false }))}>
                                                    Save
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/**Save button */}
                        <div className="my-20 grid grid-cols-6 grid-rows-1 gap-4">
                            <div className="col-span-1 col-start-6 flex justify-end">
                                <input
                                    type="hidden"
                                    name="id"
                                    value={id ?? ''}
                                ></input>
                                <div className="flex">
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="bg-dark-primary focus:ring-dark-primary w-full rounded-lg px-8 py-2.5 text-sm font-semibold text-nowrap text-white hover:cursor-pointer hover:bg-[#0C587B] focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {isPending ? 'Saving...' : 'Save changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CreateSettingsPage;
