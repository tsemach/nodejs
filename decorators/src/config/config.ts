export class Config {
  public static listen = {
    port: +process.env.PORT ?? 8080
  } 
}