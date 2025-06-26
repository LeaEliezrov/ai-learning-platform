import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logDirectory = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Create write streams for different log levels
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, 'access.log'),
  { flags: 'a' }
);

const errorLogStream = fs.createWriteStream(
  path.join(logDirectory, 'error.log'),
  { flags: 'a' }
);

// Custom token for response time with colors
morgan.token('response-time-colored', (req: any, res: any) => {
  const responseTime = parseFloat(res.getHeader('X-Response-Time') as string || '0');
  if (responseTime > 1000) return `🔴 ${responseTime}ms`;
  if (responseTime > 500) return `🟡 ${responseTime}ms`;
  return `🟢 ${responseTime}ms`;
});

// Custom token for status with colors
morgan.token('status-colored', (req: any, res: any) => {
  const status = res.statusCode;
  if (status >= 500) return `🔴 ${status}`;
  if (status >= 400) return `🟡 ${status}`;
  if (status >= 300) return `🔵 ${status}`;
  return `🟢 ${status}`;
});

// Development format (console)
export const devLogger = morgan(
  ':method :url :status-colored :response-time ms - :res[content-length]',
  {
    skip: (req: any, res: any) => process.env.NODE_ENV === 'test'
  }
);

// Production format (file)
export const prodLogger = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
  {
    stream: accessLogStream,
    skip: (req: any, res: any) => process.env.NODE_ENV === 'test'
  }
);

// Error logger
export const errorLogger = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
  {
    stream: errorLogStream,
    skip: (req: any, res: any) => res.statusCode < 400
  }
);

export default {
  devLogger,
  prodLogger,
  errorLogger
};
