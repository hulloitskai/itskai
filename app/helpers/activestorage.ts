import type { Blob } from "@rails/activestorage";
import { DirectUpload } from "@rails/activestorage?client";
import { start } from "@rails/activestorage?client";

import { requireMeta } from "./meta";

export const setupActiveStorage = (): void => {
  start();
};

export const uploadFile = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const url = requireMeta("active-storage-direct-uploads-url");
    const upload = new DirectUpload(file, url);
    upload.create((error, blob) => {
      if (error) {
        console.error(
          `Error uploading file '${file.name}'`,
          formatJSON({ error }),
        );
        reject(error);
      } else {
        resolve(blob);
      }
    });
  });
};
