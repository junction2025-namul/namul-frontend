import React, { useState } from 'react';
import { X, FileText, Link, Mountain, Upload } from 'lucide-react';

type UploadModalProps = {
    onAddCard: (card: Omit<Card, 'id'>) => void;
    onClose: () => void;
}

const UploadModal = ({ onAddCard, onClose }: UploadModalProps) => {
    const [activeTab, setActiveTab] = useState<'file' | 'link'>('file');
    const [isDragOver, setIsDragOver] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [preShare, setPreShare] = useState(false);

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
        // 파일 처리 로직
        const files = e.dataTransfer.files;
        console.log('Dropped files:', files);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            console.log('Selected files:', files);
        }
    };

    const handleUpload = () => {
        // 업로드 처리 후 카드 추가
        const newCard = {
            name: "File", // 실제로는 파일명이나 링크
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

                {/* 파일 드롭 영역 */}
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
                        Drop your document here, or{' '}
                        <label className="text-blue-600 cursor-pointer hover:text-blue-700">
                            click to browse
                            <input
                                type="file"
                                className="hidden"
                                onChange={handleFileSelect}
                                accept=".png,.jpg,.jpeg"
                            />
                        </label>
                    </p>
                    <p className="text-sm text-gray-500">.png, .jpg, up to 5MB.</p>
                </div>

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
                        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;