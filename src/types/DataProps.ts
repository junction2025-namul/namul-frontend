import type { ApiResponse } from "./CommonProps";

type DocumentData = {
    docId: string;
    title: string;
    uploadDate: string;
    newbieDoc: boolean;
}

export type DataResponseProps = {
    categoryId: string;
    category: string;
    documentInfo: DocumentData[];
}

export type DataResponse = ApiResponse<DataResponseProps>;
