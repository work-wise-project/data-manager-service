import { Storage } from '@google-cloud/storage';
import { getConfig } from './config';

const { googleCloudKey, googleStorageBucket, googleProjectId } = getConfig();

let client: Storage;

export const getStorageClient = () => {
    if (!client) {
        client = new Storage({ keyFile: googleCloudKey, projectId: googleProjectId });
    }

    return {
        uploadFile: async (fileName: string, content: Buffer | string) => {
            try {
                const file = client.bucket(googleStorageBucket).file(fileName);

                await file.save(content);
            } catch (error) {
                console.error('Error uploading file:', error);
                throw error;
            }
        },
    };
};
