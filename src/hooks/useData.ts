import type { DataRequest, DataResponse } from "../types/DataProps";
import { useApiMutation, useApiQuery } from "./apiHooks";

export const useDataResponse = () => {
    return useApiQuery<DataResponse>({
        method: 'GET',
        endpoint: '/api/namul',
    });
}

export const useDataRequest = () => 
{
    return useApiMutation<DataRequest>({
        method: 'POST',
        endpoint: '/api/namul',
    });
}