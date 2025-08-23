import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { dummyDashBoardCard } from '../mocks/dashboard';
import type { DashboardCard } from '../types/DashBoardProps';
import ic_folder from '../assets/icons/ic_folder.svg';
import ResourceSection from '../components/common/home/ResourceSection';
import { Plus } from 'lucide-react';
import { useDataResponse } from '../hooks/useData';

type Section = {
    id: number;
    title: string;
}

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { data, isLoading, isError } = useDataResponse();

    const cards = data ?? [];

    // 입력창 표시 상태 추가
    const [showInput, setShowInput] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    // 입력창 영역을 참조하기 위한 ref
    const inputRef = useRef<HTMLDivElement>(null);

    // Mock data - 실제로는 AI 분석 결과를 받아옴
    const [categories, setCategories] = useState<DashboardCard[]>(dummyDashBoardCard);
    
    // 여러 ResourceSection을 관리하는 상태
    const [sections, setSections] = useState<Section[]>([
        { id: 1, title: '공통' }
    ]);

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowInput(false);
                setCategoryName('');
            }
        };

        if (showInput) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showInput]);

    // Plus 버튼 클릭 핸들러
    const handlePlusClick = () => {
        setShowInput(true);
    };

    // 입력창 제출 핸들러
    const handleInputSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (categoryName.trim()) {
            console.log('새 카테고리:', categoryName);
            // 새로운 섹션 추가
            const newSection = {
                id: Date.now(),
                title: categoryName
            };
            setSections(prev => [...prev, newSection]);
            setCategoryName('');
            setShowInput(false);
        }
    };

    // 입력창 취소 핸들러
    const handleInputCancel = () => {
        setCategoryName('');
        setShowInput(false);
    };

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4"></div>
            <h2 className="text-xl mb-2">로딩중입니다</h2>
            <p className="">잠시만 기다려주세요...</p>
            </div>
        </div>
        );
    }

    if (isError){
        return (
            <div className="">Error</div>
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
            <div 
                onClick={()=>navigate('/')}
                className="px-6 py-2">
                <div className="flex items-center space-x-3 cursor-pointer bg-gray-100 text-black-600 rounded-lg">
                <span>📁 Home</span>
                </div>
            </div>
            <div 
                onClick={() => navigate('/tracking')}
                className="px-6 py-2">
                <div className="flex items-center space-x-3 cursor-pointer">
                <span>🔎 Tracking</span>
                </div>
            </div>
            </nav>
        </div>

            {/* 우측 메인 콘텐츠 영역 */}
            <div className="flex-1 flex flex-col">
                {/* 상단 탭 바 */}
                <div className="bg-white border-b border-[#E5E5E5] p-4 mb-3">
                    <h1 className="font-semibold">📁 Home</h1>
                </div>

                {/* 파트 섹션들 */}
                <div className="flex items-start space-x-6 p-6">
                    {sections.map((section) => {
                        const categoryData = Array.isArray(cards) ? cards.find(card => card.category === section.title) : null;
                        const documents = categoryData?.documentInfo || [];
                        
                        return (
                            <ResourceSection 
                                key={section.id}
                                title={section.title}
                                documents={documents}  // ✅ API 데이터 전달
                                categoryId={categoryData?.categoryId}
                            />
                        );
                    })}
                    
                    {/* Plus 버튼과 입력창 */}
                    <div className="flex flex-col" ref={inputRef}>
                        <Plus 
                            onClick={handlePlusClick}
                            className="w-5 h-5 mt-[15.5px] text-gray-500 cursor-pointer hover:text-gray-700" />
                        {/* 입력창 - showInput이 true일 때만 표시 */}
                        {showInput && (
                            <div className="mt-2 p-3 min-w-[200px]">
                                <form onSubmit={handleInputSubmit}>
                                    <input
                                        type="text"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        placeholder="카테고리 이름"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === 'Escape') {
                                                handleInputCancel();
                                            }
                                        }}
                                    />
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;