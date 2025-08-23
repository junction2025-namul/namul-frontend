import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { dummyDashBoardCard } from '../mocks/dashboard';
import type { DashboardCard } from '../types/DashBoardProps';
import ic_folder from '../assets/icons/ic_folder.svg';
import ResourceSection from '../components/common/home/ResourceSection';

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
        <div className="w-64 bg-white border-r border-[#E5E5E5]">
            {/* 헤더 */}
            <div className="px-6 py-4 border-b border-[#E5E5E5]">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-black rounded"></div>
                    <span className="font-inter">Team Namul</span>
                </div>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className="mt-6">
            <div className="px-6 py-2">
                <div className="flex items-center space-x-3 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                <span>Home</span>
                </div>
            </div>
            <div className="px-6 py-2">
                <div className="flex items-center space-x-3 cursor-pointer">
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
                <h1 className="font-semibold">Home</h1>
            </div>

            <ResourceSection />
            </div>
        </div>
    );
};

export default DashboardPage;