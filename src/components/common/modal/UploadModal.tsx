import React, { useState } from 'react';
import { X, FileText, Link, Mountain, Upload } from 'lucide-react';
import { useUploadDocument, fileToBase64 } from '../../../hooks/useUpload';

type Card = {
    id: number;
    name: string;
    description?: string;
    tag?: string;
    date: string;
    type: "file" | "link";
}

type UploadModalProps = {
    onAddCard: (card: Omit<Card, 'id'>) => void;
    onClose: () => void;
    categoryId: string; // API 연결을 위해 추가
    uploadedBy: string; // API 연결을 위해 추가
}

const UploadModal = ({ onAddCard, onClose, categoryId, uploadedBy }: UploadModalProps) => {
    const [activeTab, setActiveTab] = useState<'file' | 'link'>('file');
    const [isDragOver, setIsDragOver] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [preShare, setPreShare] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [linkUrl, setLinkUrl] = useState('');

    // API 뮤테이션 훅 사용
    const { mutate: uploadDocument, isLoading, isError, error } = useUploadDocument();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleUpload = async () => {
        let fileContent = '';
        let cardName = '';

        if (activeTab === 'file') {
            if (!selectedFile) {
                alert('파일을 선택해주세요.');
                return;
            }
            fileContent = await fileToBase64(selectedFile);
            cardName = selectedFile.name;
        } else {
            if (!linkUrl.trim()) {
                alert('링크 URL을 입력해주세요.');
                return;
            }
            fileContent = linkUrl.trim();
            cardName = linkUrl.trim();
        }

        // API 호출
        uploadDocument({
            file: fileContent,
            request: {
                categoryId: categoryId,
                uploadedBy: uploadedBy,
                newbieDoc: preShare,
            },
        }, {
            onSuccess: (apiResponse) => {
                console.log('API 업로드 성공:', apiResponse);
                
                // 성공 시 카드 추가
                const newCard: Omit<Card, 'id'> = {
                    name: cardName,
                    description: additionalNotes || undefined,
                    tag: preShare ? "미리 공유" : undefined,
                    date: new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }),
                    type: activeTab as "file" | "link"
                };
                onAddCard(newCard);
                onClose();
            },
            onError: (err) => {
                console.error("API 업로드 실패:", err);
                alert(`업로드 실패: ${err.message}`);
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                {/* 헤더 */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Frame 2610313</p>
                        <h2 className="text-2xl font-bold text-gray-900">Upload</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* 탭 인터페이스 */}
                <div className="flex space-x-1 mb-6">
                    <button
                        onClick={() => setActiveTab('file')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === 'file'
                                ? 'bg-pink-100 text-pink-700'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <FileText className="w-4 h-4" />
                        <span>파일</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('link')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === 'link'
                                ? 'bg-pink-100 text-pink-700'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <Link className="w-4 h-4" />
                        <span>링크</span>
                    </button>
                </div>

                {/* 콘텐츠 영역 */}
                {activeTab === 'file' ? (
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
                            isDragOver
                                ? 'border-blue-400 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <Mountain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-700 mb-2">
                            {selectedFile ? selectedFile.name : 'Drop your document here, or'}
                            <label className="text-blue-600 cursor-pointer hover:text-blue-700 ml-1">
                                {selectedFile ? '다른 파일 선택' : 'click to browse'}
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                    accept=".pdf,.png,.jpg,.jpeg"
                                />
                            </label>
                        </p>
                        <p className="text-sm text-gray-500">.pdf, .png, .jpg, up to 5MB.</p>
                    </div>
                ) : (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            링크 URL
                        </label>
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="링크를 입력해주세요"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                )}

                {/* 추가 참고사항 */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        추가 참고사항(선택)
                    </label>
                    <textarea
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        placeholder="대상에 관하여 추가로 참고할 부분을 알려주세요"
                        className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                </div>

                {/* 미리 공유 체크박스 */}
                <div className="mb-6">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={preShare}
                            onChange={(e) => setPreShare(e.target.checked)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">입사전에 미리 공유</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                        고토에 추가하는 경우에만 '인사전에 미리 고인 황선화된 7인에는 어음
                    </p>
                </div>

                {/* 업로드 버튼 */}
                <div className="flex justify-end">
                    <button
                        onClick={handleUpload}
                        disabled={isLoading}
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <Upload className="w-4 h-4" />
                        )}
                        <span>{isLoading ? '업로드 중...' : 'Upload'}</span>
                    </button>
                </div>
                {isError && <p className="text-red-500 mt-2 text-right">업로드 실패: {error?.message}</p>}
            </div>
        </div>
    );
};

export default UploadModal;