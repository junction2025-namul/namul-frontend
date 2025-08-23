import type { ApiResponse } from "./CommonProps";

export type DataResponseProps = {
    categoryId: string;
    category: string;
    documentInfo: DocumentData[];
}

export type DocumentData = {
    docId: string;
    title: string;
    uploadDate: string;
    newbieDoc: boolean;
}

// Swagger API 스펙에 맞게 직접 배열 타입으로 변경
export type DataResponse = DataResponseProps[];
