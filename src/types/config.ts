export type Config = {
    isProductionEnv: boolean;
    port: number;
    googleProjectId: string;
    googleCloudKey: string;
    googleStorageResumeBucket: string;
    googleStorageAudioBucket: string;
    httpsKey: string;
    httpsCert: string;
};
