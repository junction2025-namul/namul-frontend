import React, { useRef, useState, useCallback } from 'react';

interface FileUploadAreaProps {
  onFileUpload: (files: FileList) => void;
  isUploading: boolean;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileUpload, isUploading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (files && files.length > 0) {
      onFileUpload(files);
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    // Reset input value to allow selecting the same file again
    if (e.target) {
      e.target.value = '';
    }
  }, [handleFileSelect]);

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
          ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={isUploading ? undefined : handleClick}
      >
        {/* Upload Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
          </div>
        </div>

        {/* Upload Text */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isUploading ? '업로드 중...' : '파일을 업로드하세요'}
          </h3>
          <p className="text-gray-600">
            {isUploading 
              ? '파일이 업로드되고 있습니다. 잠시만 기다려주세요.'
              : '드래그 앤 드롭하거나 클릭하여 파일을 선택하세요'
            }
          </p>
        </div>

        {/* Supported Formats */}
        <div className="text-sm text-gray-500">
          <p className="mb-2">지원되는 형식:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">Excel (.xlsx, .xls)</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">CSV (.csv)</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">PDF (.pdf)</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">Word (.docx, .doc)</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">Text (.txt)</span>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".xlsx,.xls,.csv,.pdf,.docx,.doc,.txt"
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />

        {/* Upload Button */}
        {!isUploading && (
          <button
            type="button"
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            파일 선택
          </button>
        )}
      </div>

      {/* Upload Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 업로드 팁</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 직원 정보가 포함된 파일을 업로드하세요 (이름, 부서, 직급, 입사일 등)</li>
          <li>• 여러 파일을 동시에 업로드할 수 있습니다</li>
          <li>• 파일 크기는 최대 50MB까지 지원됩니다</li>
          <li>• 민감한 개인정보는 암호화되어 안전하게 처리됩니다</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploadArea;
