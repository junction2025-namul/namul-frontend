import { useMutation } from '@tanstack/react-query';
import { uploadDocument } from '../lib/axios';

// API 요청 타입
interface UploadDocumentRequest {
  file: string; // Base64 인코딩된 파일 내용 또는 링크 URL
    request: {
        categoryId: string;
        uploadedBy: string;
        newbieDoc: boolean;
    };
}

// API 응답 타입 (스웨거 스펙 기반)
interface UploadDocumentResponse {
    additionalProp1?: any;
    additionalProp2?: any;
    additionalProp3?: any;
    // 실제 응답에 따라 추가 필드 정의 가능
    success?: boolean;
    message?: string;
    documentId?: string;
}

// 파일을 Base64로 변환하는 유틸리티 함수
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
    });
};

// 업로드 뮤테이션 훅
export const useUploadDocument = () => {
    return useMutation<UploadDocumentResponse, Error, UploadDocumentRequest>({
            mutationFn: async (data: UploadDocumentRequest) => {
            const response = await uploadDocument(data);
        return response.data;
        },
    });
};