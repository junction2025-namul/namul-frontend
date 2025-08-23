import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE, // 환경변수로 주입
    withCredentials: true,
});

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

    return axiosInstance.post('/api/hr-documents/upload', formData, {
        timeout: 60000,
    });
};

console.log('AXIOS BASE', axiosInstance.defaults.baseURL);

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;