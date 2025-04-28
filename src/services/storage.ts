import { Storage } from '@google-cloud/storage';
import { getConfig } from './config';

const { googleCloudKey, googleStorageBucket, googleProjectId } = getConfig();

let client: Storage;

export const getStorageClient = () => {
    if (!client) {
        client = new Storage({ keyFile: googleCloudKey, projectId: googleProjectId });
    }

    return {
        uploadFile: async (fileName: string, content: Buffer | string, mimeType: string) => {
            try {
                const file = client.bucket(googleStorageBucket).file(fileName);

                await file.save(content, { contentType: mimeType });
                return `https://storage.googleapis.com/${googleStorageBucket}/${fileName}`;
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
        },
        downloadFile: async (fileName: string) => {
            try {
                const file = client.bucket(googleStorageBucket).file(fileName);
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
