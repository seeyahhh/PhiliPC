'use server'

import { updateUser } from '@/app/lib/queries/user';

export async function update(formData: FormData) {
  const id = Number(formData.get('id'));
  const username = String(formData.get('username'));

  await updateUser(id, username);
}