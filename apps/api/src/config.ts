import * as yup from 'yup';

import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

export async function validateEnv() {
  return yup
    .object({
      PORT: yup.number().required(),
      DATABASE_URL: yup.string().required(),
      PROJECT_NAME: yup.string().required(),
      BACKEND_URL: yup.string().required(),
      FRONTEND_URL: yup.string().required(),
      JWT_SECRET: yup.string().required(),
      OPENCAGE_API: yup.string().required(),
      GOOGLE_CLIENT_ID: yup.string().required(),
      GOOGLE_CLIENT_SECRET: yup.string().required(),
      MAXIMUM_RADIUS: yup.number().required(),
      PRICE_PER_KM: yup.number().required(),
      PRICE_PER_KG: yup.number().required(),
      RESEND_API: yup.string().required(),
      RESEND_FROM: yup.string().required(),
      CLOUDINARY_CLOUD_NAME: yup.string().required(),
      CLOUDINARY_API_KEY: yup.string().required(),
      CLOUDINARY_API_SECRET: yup.string().required(),
      MIDTRANS_ID: yup.string().required(),
      MIDTRANS_URL: yup.string().url().required(),
      MIDTRANS_PASSWORD: yup.string().required(),
      MIDTRANS_CLIENT_KEY: yup.string().required(),
      MIDTRANS_SERVER_KEY: yup.string().required(),
    })
    .validate(process.env);
}

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const BACKEND_URL = process.env.BACKEND_URL as string;
export const FRONTEND_URL = process.env.FRONTEND_URL as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const OPENCAGE_API = process.env.OPENCAGE_API as string;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
export const MAXIMUM_RADIUS = Number(process.env.MAXIMUM_RADIUS as string);
export const PRICE_PER_KM = Number(process.env.PRICE_PER_KM as string);
export const PRICE_PER_KG = Number(process.env.PRICE_PER_KG as string);
export const RESEND_API = process.env.RESEND_API as string;
export const RESEND_FROM = process.env.RESEND_FROM as string;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;
export const MIDTRANS_ID = process.env.MIDTRANS_ID as string;
export const MIDTRANS_URL = process.env.MIDTRANS_URL as string;
export const MIDTRANS_PASSWORD = process.env.MIDTRANS_PASSWORD as string;
export const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY as string;
export const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY as string;
