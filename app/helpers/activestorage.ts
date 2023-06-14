import { DirectUpload as ClientDirectUpload } from "@rails/activestorage?client";
import { start as startClient } from "@rails/activestorage?client";
import type { Blob, DirectUpload } from "@rails/activestorage";

import { requireMeta } from "./meta";

export const setupActiveStorage = (): void => {
  startClient();
};

export const uploadFile = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const url = requireMeta("active-storage-direct-uploads-url");
    const upload: DirectUpload = new ClientDirectUpload(file, url);
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
