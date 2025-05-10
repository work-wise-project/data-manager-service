import { Storage } from '@google-cloud/storage';
import { getConfig } from './config';

const { googleCloudKey, googleProjectId } = getConfig();

let client: Storage;

export const getStorageClient = () => {
    if (!client) {
        client = new Storage({ keyFile: googleCloudKey, projectId: googleProjectId });
    }

    return {
        uploadFile: async (bucket: string, fileName: string, content: Buffer | string, mimeType: string) => {
            try {
                const file = client.bucket(bucket).file(fileName);

                await file.save(content, { contentType: mimeType });
                return `https://storage.googleapis.com/${bucket}/${fileName}`;
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
        },
        downloadFile: async (bucket: string, fileName: string) => {
            try {
                const file = client.bucket(bucket).file(fileName);
                const [fileBuffer] = await file.download();
                const [metadata] = await file.getMetadata();

                const mimeType = metadata.contentType;

                return { fileBuffer, mimeType };
            } catch (error) {
                console.error('Error downloading file:', error);
                throw error;
            }
        },
    };
};
