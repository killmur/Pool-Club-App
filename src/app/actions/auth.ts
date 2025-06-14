'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * Creates a new user and hashes their password
 */
export async function register({
  email,
  password,
  full_name,
}: {
  email: string,
  password: string,
  full_name: string,
}) {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) throw new Error('User already exists');

  const password_hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      full_name,
      password_hash,
      status: 'pending',
      email_verified: false,
      is_admin: false,
      is_super_admin: false,
    },
  });

  return user;
}
