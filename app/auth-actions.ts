'use server';

import { hashPassword, createSession, verifyPassword } from '@/lib/auth';
import { createUser, getUserByEmail } from '@/lib/data';
import { redirect } from 'next/navigation';

export async function signupAction(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password || password.length < 6) {
        return { error: 'Invalid data' };
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: 'User already exists' };
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({ email, password: hashedPassword, name });

    await createSession(user.id, user.email);
    redirect('/dashboard');
}

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await getUserByEmail(email);
    if (!user || !user.password) {
        return { error: 'Invalid credentials' };
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
        return { error: 'Invalid credentials' };
    }

    await createSession(user.id, user.email);
    redirect('/dashboard');
}
