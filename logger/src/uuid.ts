import { v4 as uuidv4 } from 'uuid';

export class UUIDv4 {
  public static gen(suffix?: string) {
    if (suffix) {
      return uuidv4() + '.' + suffix;
    }
    return uuidv4();
  }  

  public static strip(uuid: string) {
    return uuid.split('.')[0];
  }

  public static suffix(uuid: string) {
    return uuid.split('.')[1];
  }

  public static replace(uuid: string, replaceWith: string) {
    return uuid.replace(/\./, replaceWith)
  }

  public static short(size = 8) {
    return this.gen().slice(0, size)
  }
}
