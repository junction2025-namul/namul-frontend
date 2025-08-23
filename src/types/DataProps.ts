import type { ApiResponse } from "./CommonProps";

export type DataResponseProps = {
    id: string;
    name: string;
    description: string;
}

export type DataRequestProps = {
    id: string;
    name: string;
    description: string;
}

export type DataResponse = ApiResponse<DataResponseProps>;

export type DataRequest = ApiResponse<DataRequestProps>;
