// logger.service.ts
export class LoggerService {
  constructor(private level: string) {}

  log(message: string) {
    console.log(`[${this.level}] ${message}`);
  }

  createContextLogger(context: string) {
    return {
      log: (message: string) => {
        console.log(`[${this.level}] [${context}] ${message}`);
      },
    };
  }
}
