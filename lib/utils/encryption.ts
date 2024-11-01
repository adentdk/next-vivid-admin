import CryptoJS from "crypto-js";

export class Encryption {
  static encrypt(secrect: string, data: string | number | any[] | object) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secrect).toString();
    } catch (error) {
      return JSON.stringify(data);
    }
  }

  static decrypt<T = any>(secrect: string, data: string): T | null {
    try {
      const bytes = CryptoJS.AES.decrypt(data, secrect);
      const decoded = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decoded);
    } catch (error) {
      return null;
    }
  }
}
