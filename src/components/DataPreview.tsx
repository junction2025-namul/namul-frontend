import React, { useState } from 'react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
}

interface DataPreviewProps {
  files: UploadedFile[];
}

const DataPreview: React.FC<DataPreviewProps> = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Mock data for preview - 실제로는 파일 내용을 파싱해서 보여줄 예정
  const mockData = {
    'employee_data.xlsx': [
      { name: '김철수', department: '개발팀', position: '시니어 개발자', hireDate: '2020-03-15', status: '재직중' },
      { name: '이영희', department: '마케팅팀', position: '마케팅 매니저', hireDate: '2019-07-01', status: '재직중' },
      { name: '박민수', department: '인사팀', position: '인사팀장', hireDate: '2018-11-20', status: '재직중' },
      { name: '정수진', department: '디자인팀', position: 'UI/UX 디자이너', hireDate: '2021-01-10', status: '재직중' },
    ],
    'onboarding_checklist.pdf': [
      { step: '1', task: '계약서 서명', status: '완료', assignee: '인사팀', dueDate: '2024-01-15' },
      { step: '2', task: '회사 소개 및 정책 교육', status: '진행중', assignee: '인사팀', dueDate: '2024-01-16' },
      { step: '3', task: '업무 환경 설정', status: '대기중', assignee: 'IT팀', dueDate: '2024-01-17' },
      { step: '4', task: '부서 소개 및 멘토 배정', status: '대기중', assignee: '각 부서장', dueDate: '2024-01-18' },
    ],
    'exit_interview.csv': [
      { name: '최지훈', department: '영업팀', exitDate: '2024-01-10', reason: '개인 사정', satisfaction: '보통' },
      { name: '한미영', department: '고객지원팀', exitDate: '2024-01-05', reason: '이직', satisfaction: '만족' },
    ]
  };

  const getFileData = (fileName: string) => {
    return mockData[fileName as keyof typeof mockData] || [];
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeIcon = (type: string) => {
    if (type.includes('excel') || type.includes('spreadsheet')) {
      return (
        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
        </div>
      );
    }
    if (type.includes('pdf')) {
      return (
        <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
          </svg>
        </div>
      );
    }
    if (type.includes('csv')) {
      return (
        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
          </svg>
        </div>
      );
    }
    return (
      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* File List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map(file => (
          <div
            key={file.id}
            className={`
              p-4 border rounded-lg cursor-pointer transition-all duration-200
              ${selectedFile === file.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
            onClick={() => setSelectedFile(file.id)}
          >
            <div className="flex items-start space-x-3">
              {getFileTypeIcon(file.type)}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(file.size)}
                </p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    분석 완료
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data Preview */}
      {selectedFile && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {files.find(f => f.id === selectedFile)?.name} - 데이터 미리보기
            </h3>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(getFileData(files.find(f => f.id === selectedFile)?.name || '')).length > 0 && 
                   Object.keys(getFileData(files.find(f => f.id === selectedFile)?.name || '')[0]).map(key => (
                    <th key={key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getFileData(files.find(f => f.id === selectedFile)?.name || '').map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-3 text-sm text-gray-900 border-b">
                        {typeof value === 'string' && value.includes('완료') ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {value}
                          </span>
                        ) : typeof value === 'string' && value.includes('진행중') ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {value}
                          </span>
                        ) : typeof value === 'string' && value.includes('대기중') ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Data Summary */}
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <h4 className="text-sm font-medium text-gray-900 mb-2">데이터 분석 요약</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">총 레코드</p>
                <p className="font-medium">{getFileData(files.find(f => f.id === selectedFile)?.name || '').length}개</p>
              </div>
              <div>
                <p className="text-gray-500">컬럼 수</p>
                <p className="font-medium">
                  {getFileData(files.find(f => f.id === selectedFile)?.name || '').length > 0 
                    ? Object.keys(getFileData(files.find(f => f.id === selectedFile)?.name || '')[0]).length 
                    : 0}개
                </p>
              </div>
              <div>
                <p className="text-gray-500">파일 형식</p>
                <p className="font-medium">{files.find(f => f.id === selectedFile)?.type || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-gray-500">상태</p>
                <p className="font-medium text-green-600">분석 완료</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPreview;
