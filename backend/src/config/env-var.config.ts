import 'dotenv/config';
import { get } from 'env-var';

export const environmentVars = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_FILES: get('PUBLIC_FILES').required().asString(),
  MONGO_USER: get('MONGO_USER').required().asString(),
  MONGO_PASS: get('MONGO_PASS').required().asString(),
  MONGO_DBNAME: get('MONGO_DBNAME').required().asString(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  GOOGLE_ID: get('GOOGLE_ID').required().asString(),
  GOOGLE_SECRET: get('GOOGLE_SECRET').required().asString(),
};