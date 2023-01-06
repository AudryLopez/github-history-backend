import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = join(__dirname, '../../.env');
      const existPath = existsSync(envFilePath);
      if (!existPath) {
        console.log('.env file does not exist');
        process.exit(0);
      }
      const envFileText = readFileSync(envFilePath);

      this.envConfig = parse(envFileText);
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
        GITHUB_API: process.env.GITHUB_API,
      };
    }
  }

  get(key: string): string {
    const keyExistInEnvs = key in this.envConfig;
    if (!keyExistInEnvs) {
      throw `${String(key)} is a missing enviroments variables.`;
    }
    return this.envConfig[key];
  }
}
