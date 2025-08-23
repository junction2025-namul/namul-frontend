import React, { useState } from 'react';
import FileUploadArea from '../components/FileUploadArea';
import UploadProgress from '../components/UploadProgress';
import DataPreview from '../components/DataPreview';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  preview?: T;
}

const DataUploadPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    
    const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading' as const,
      progress: 0,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // 업로드 과정 시뮬레이션
    for (const file of newFiles) {
      await simulateFileUpload(file.id);
    }

    setIsUploading(false);
  };

  const simulateFileUpload = async (fileId: string) => {
    // 업로드 과정 시뮬레이션
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId 
            ? { ...file, progress, status: progress === 100 ? 'completed' : 'uploading' }
            : file
        )
      );
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleProcessData = () => {
    // TODO: Implement data processing logic
    console.log('Processing uploaded data...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            HR 데이터 업로드
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            온보딩 및 퇴사 프로세스를 위한 직원 데이터를 업로드하세요. 
            다양한 형식의 파일을 지원합니다.
          </p>
        </div>

        {/* 업로드 영역 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <FileUploadArea 
            onFileUpload={handleFileUpload}
            isUploading={isUploading}
          />
        </div>

        {/* 업로드 과정 */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl mb-6">
              업로드 진행 상황
            </h2>
            <div className="space-y-4">
              {uploadedFiles.map(file => (
                <UploadProgress
                  key={file.id}
                  file={file}
                  onRemove={removeFile}
                />
              ))}
            </div>
          </div>
        )}

        {/* 데이터 미리보기 */}
        {uploadedFiles.some(file => file.status === 'completed') && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl mb-6">
              데이터 미리보기
            </h2>
            <DataPreview files={uploadedFiles.filter(f => f.status === 'completed')} />
          </div>
        )}

        {/* 액션 버튼들 */}
        {uploadedFiles.some(file => file.status === 'completed') && (
          <div className="flex justify-center gap-4">
            <button
              onClick={handleProcessData}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              데이터 처리 시작
            </button>
            <button
              onClick={() => setUploadedFiles([])}
              className="px-8 py-4 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              모든 파일 제거
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataUploadPage;
