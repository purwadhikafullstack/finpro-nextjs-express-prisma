import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL as string;
export const BACKEND_URL = process.env.BACKEND_URL as string;
export const FRONTEND_URL = process.env.FRONTEND_URL as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const OPENCAGE_API = process.env.OPENCAGE_API as string;
