import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// 기존 axios 설정에 추가
// axios.ts
export const uploadDocument = (data: any) => {
    const formData = new FormData();
    
    // 서버가 기대하는 정확한 필드명 확인 필요
    formData.append('file', data.file);
    formData.append('categoryId', data.request.categoryId);
    formData.append('uploadedBy', data.request.uploadedBy);
    formData.append('newbieDoc', data.request.newbieDoc.toString());
    formData.append('additionalNotes', data.request.additionalNotes || '');

    console.log('FormData 내용:', {
        file: data.file,
        categoryId: data.request.categoryId,
        uploadedBy: data.request.uploadedBy,
        newbieDoc: data.request.newbieDoc,
    });

    // 토큰 가져오기
    const token = useAuthStore.getState().token;
    
    // 헤더 설정
    const headers: Record<string, string> = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return axios.post('/api/hr-documents/upload', formData, {
        headers,
        timeout: 60000,
        withCredentials: true,
    });
};

console.log('Using proxy to:', 'https://namul-backend-production-7a51.up.railway.app');

// axiosInstance는 다른 곳에서 사용할 수 있도록 유지
const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;