'use server';

import { updateUser } from '@/app/lib/queries/user';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type UpdateUserState = {
    success: boolean;
    message?: string;
    errors?: {
        username?: string[];
        first_name?: string[];
        last_name?: string[];
        fb_link?: string[];
        email?: string[];
        contact_no?: string[];
        password?: string[];
    } | undefined;
};

// function na gumagamit ng zod na magvavalidate sa form data natin 
const updateProfileSchema = z.object({
    username: z.string()
                .min(4, "Username must be at least 3 characters long")
                .max(20, "Username is too long."),
    first_name: z.string()
                .min(1, "First name is required."),
    last_name: z.string()
                .min(1, "Last name is required."),
    fb_link: z.string()
                .url("Must be a valid URL")
                .or(z.literal("")),
    email: z.string()
            .email("Invalid email address"),
    contact_no: z.string()
                    .min(10, "Invalid number"), 
    password: z.string().min(8, "Password must be at last 8 characters long."),
});

export async function update(
    prevState: UpdateUserState,
    formData: FormData
): Promise<UpdateUserState> {
    const validatedFields = updateProfileSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Error with fields.  Please try again.",
        };
    }

    const id = Number(formData.get('id'));
    const username = String(formData.get('username')) ?? null;
    const email = String(formData.get('email')) ?? null;
    const password = String(formData.get('password')) ?? null;
    const first_name = String(formData.get('first_name')) ?? null;
    const last_name = String(formData.get('last_name')) ?? null;
    const fb_link = String(formData.get('fb_link')) ?? null;
    const contact_no = String(formData.get('contact_no')) ?? null;

    const result = await updateUser(
        id,
        username,
        email,
        password,
        first_name,
        last_name,
        fb_link,
        contact_no
    );

    if (!result.success) {
        return {
            success: false,
            message: result.message,
        };
    } else {
        redirect(`/settings`);
    }
    
}
