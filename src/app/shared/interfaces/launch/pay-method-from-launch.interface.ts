export interface payMethodFromLaunch {
    id: number;
    payMethod: string;
    launchId: number;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}