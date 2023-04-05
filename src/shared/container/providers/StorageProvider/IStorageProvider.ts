export interface IStorageProvider {
  save(filename: string, folder: string): Promise<string>;
  delete(filename: string, folder: string): Promise<void>;
}
