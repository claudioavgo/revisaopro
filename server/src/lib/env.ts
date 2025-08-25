import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number(),
  API_BASE_URL: z.string(),

  // Database
  DATABASE_URL: z.string(),

  // JWT
  JWT_AUTHENTICATION_TOKEN_SECRET: z.string(),
  JWT_AUTHENTICATION_TOKEN_EXPIRES_IN: z.string(),
  JWT_AUTHENTICATION_TOKEN_COOKIES_MAX_AGE: z.string(),

  // Google Auth
  GOOGLE_AUTH_BASE_URL: z.string(),
  GOOGLE_AUTH_CLIENT_ID: z.string(),
  GOOGLE_AUTH_CLIENT_SECRET: z.string(),
  GOOGLE_AUTH_CALLBACK_URL: z.string(),
  GOOGLE_AUTH_REDIRECT_URL: z.string(),

  // AWS
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),

  // OpenAI
  OPENAI_API_KEY: z.string(),
});

export const env = schema.parse(process.env);
