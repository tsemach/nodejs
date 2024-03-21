export class Config {
  public static readonly sockfile = process.env.LOGGER_SOCK_FILE ?? '/shared/tmp/logger.sock'
}
