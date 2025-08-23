import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { dummyDashBoardCard } from '../mocks/dashboard';
import type { DashboardCard } from '../types/DashBoardProps';
import ic_folder from '../assets/icons/ic_folder.svg';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mock data - 실제로는 AI 분석 결과를 받아옴
    const [categories, setCategories] = useState<DashboardCard[]>(dummyDashBoardCard);

    useEffect(() => {
        // AI 분석 시뮬레이션
        const simulateAIAnalysis = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        };

        simulateAIAnalysis();
    }, []);

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4"></div>
            <h2 className="text-xl mb-2">AI가 데이터를 분석하고 있습니다</h2>
            <p className="">잠시만 기다려주세요...</p>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen flex">
        {/* 좌측 사이드바 */}
        <div className="w-64 bg-white shadow-lg border-r border-[#E5E5E5]">
            {/* 헤더 */}
            <div className="px-6 py-4 border-b border-[#E5E5E5]">
            <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-black rounded"></div>
                <span className="font-semibold text-gray-900">Team Namul</span>
            </div>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="mt-6">
            <div className="px-6 py-2">
                <div className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                <span>Home</span>
                </div>
            </div>
            <div className="px-6 py-2">
                <div className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                <span>Home</span>
                </div>
            </div>
            </nav>
        </div>

        {/* 우측 메인 콘텐츠 영역 */}
        <div className="flex-1 flex flex-col">
            {/* 상단 탭 바 */}
            <div className="bg-white border-b border-[#E5E5E5] p-4">
                <h2 className="font-semibold">Home</h2>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="flex-1 p-6 space-y-4 bg-gray-50">
            {/* Preview 섹션 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-medium text-gray-700">Preview</span>
                </div>
            </div>

            {/* 파일 목록 */}
            <div className="space-y-2">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                        <div className="font-medium text-gray-900">File name</div>
                        <div className="text-sm text-gray-500">Aug 23rd 2025</div>
                    </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                    </button>
                </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <div>
                    <div className="font-medium text-gray-900">Link</div>
                    <div className="text-sm text-gray-500">Aug 23rd 2025</div>
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <div>
                    <div className="font-medium text-gray-900">Link</div>
                    <div className="text-sm text-gray-500">Aug 23rd 2025</div>
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                    <div className="font-medium text-gray-900">File name</div>
                    <div className="text-sm text-gray-500">Aug 23rd 2025</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default DashboardPage;