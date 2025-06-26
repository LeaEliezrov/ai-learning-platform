// Environment validation utility
interface EnvConfig {
  REACT_APP_API_URL: string;
  REACT_APP_ENVIRONMENT: 'development' | 'staging' | 'production';
}

class EnvironmentValidator {
  private static instance: EnvironmentValidator;
  private config: EnvConfig;

  private constructor() {
    this.config = this.validateAndParseEnv();
  }

  public static getInstance(): EnvironmentValidator {
    if (!EnvironmentValidator.instance) {
      EnvironmentValidator.instance = new EnvironmentValidator();
    }
    return EnvironmentValidator.instance;
  }

  private validateAndParseEnv(): EnvConfig {
    const requiredVars = ['REACT_APP_API_URL'];
    const missingVars = requiredVars.filter(
      (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    }

    return {
      REACT_APP_API_URL: process.env.REACT_APP_API_URL!,
      REACT_APP_ENVIRONMENT: (process.env.REACT_APP_ENVIRONMENT as any) || 'development',
    };
  }

  public getConfig(): EnvConfig {
    return this.config;
  }

  public isDevelopment(): boolean {
    return this.config.REACT_APP_ENVIRONMENT === 'development';
  }

  public isProduction(): boolean {
    return this.config.REACT_APP_ENVIRONMENT === 'production';
  }
}

export const envValidator = EnvironmentValidator.getInstance();
export const envConfig = envValidator.getConfig();
