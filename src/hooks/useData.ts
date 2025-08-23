import type { DataResponse } from "../types/DataProps";
import { useApiQuery } from "./apiHooks";

export const useDataResponse = () => {
    return useApiQuery<DataResponse>({
        method: 'GET',
        endpoint: '/api/hr-documents',
    });
}
