import { Plus } from "lucide-react";
import ResourceCard from "./ResourceCard";
import { useState } from "react";
import UploadModal from "../modal/UploadModal";
import { useNavigate } from "react-router";
import ic_upload from '../../../assets/icons/ic_upload.svg'
import type { DocumentData } from "../../../types/DataProps";

type ResourceSection = {
    title: string;
    documents?: DocumentData[];  // ✅ API 데이터 받기
    categoryId?: string;
}

// 2. API 데이터를 Card 형태로 변환
// const apiCards: Card[] = documents.map(doc => ({
//     id: parseInt(doc.docId),
//     name: doc.title,
//     date: doc.uploadDate,
//     type: "file" as const,
//     tag: doc.newbieDoc ? "신규" : undefined
// }));

type Card = {
    id: number;
    name: string;
    description?: string;
    tag?: string;
    date: string;
    type: "file" | "link";
}

const ResourceSection = ({ title }: ResourceSection) => {
    const navigate = useNavigate();
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    
    // 각 섹션별 고유한 localStorage 키 생성
    const sectionKey = `section_${title}`;
    
    // localStorage 관련 함수들
    const saveGuideStateToStorage = (isCreated: boolean, isCreating: boolean) => {
        localStorage.setItem(`${sectionKey}_guideState`, JSON.stringify({
            isGuideCreated: isCreated,
            isCreatingGuide: isCreating
        }));
    };

    const loadGuideStateFromStorage = () => {
        const stored = localStorage.getItem(`${sectionKey}_guideState`);
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                isGuideCreated: parsed.isGuideCreated || false,
                isCreatingGuide: parsed.isCreatingGuide || false
            };
        }
        return { isGuideCreated: false, isCreatingGuide: false };
    };

    const saveCardsToStorage = (cardsData: Card[]) => {
        localStorage.setItem(`${sectionKey}_uploadedCards`, JSON.stringify(cardsData));
    };

    const loadCardsFromStorage = (): Card[] => {
        const stored = localStorage.getItem(`${sectionKey}_uploadedCards`);
        return stored ? JSON.parse(stored) : [];
    };

    // 초기 상태를 localStorage에서 불러오기
    const initialGuideState = loadGuideStateFromStorage();
    const [isGuideCreated, setIsGuideCreated] = useState(initialGuideState.isGuideCreated);
    const [isCreatingGuide, setIsCreatingGuide] = useState(initialGuideState.isCreatingGuide);
    
    // 카드 상태를 localStorage에서 불러오기
    const [cards, setCards] = useState<Card[]>(() => loadCardsFromStorage());

    const hasCards = cards.length > 0;

    // Plus 버튼 클릭 핸들러
    const handlePlusClick = () => {
        setShowUploadModal(true);
    };

    // Guide 버튼 클릭 핸들러
    const handleGuideClick = () => {
        if (!isGuideCreated) {
            // 가이드 생성 중
            setIsCreatingGuide(true);
            saveGuideStateToStorage(false, true);
            
            setTimeout(() => {
                setIsGuideCreated(true);
                setIsCreatingGuide(false);
                saveGuideStateToStorage(true, false);
            }, 4000);
        } else {
            // CheckList 페이지로 이동
            navigate('/checklist');
        }
    };

    // 모달에서 카드 추가 핸들러
    const handleAddCard = (newCard: Omit<Card, 'id'>) => {
        const cardWithId = {
            ...newCard,
            id: Date.now() // 고유 ID 생성
        };
        const updatedCards = [...cards, cardWithId];
        setCards(updatedCards);
        saveCardsToStorage(updatedCards); // localStorage에 저장
        setShowUploadModal(false);
    };

    // 모달 닫기 핸들러
    const handleCloseModal = () => {
        setShowUploadModal(false);
    };

    // Update 버튼 클릭 핸들러
    const handleUpdateClick = () => {
        setIsUpdating(true);
        // 3초 후 업데이트 완료
        setTimeout(() => {
            setIsUpdating(false);
        }, 1000);
    };


    return (
        <div className="grid grid-flex flex-col min-w-[350px] px-6">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2 py-[14px]">
                    <p className="text-[#404040] text-sm">{title}</p>
                    <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">{cards.length}</span>
                </div>
                <Plus 
                    onClick={handlePlusClick}
                    className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
            

            {/* 메인 콘텐츠 */}
            <div className="flex-1 space-y-4">
                {hasCards ? (
                    <>
                        {/* Preview 섹션 */}
                        <div className="flex w-full items-center justify-between">
                            <div 
                                onClick={handleGuideClick}
                                className={`w-full h-[52px] rounded-lg px-4 border border-[#E5E5E5] shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 ${
                                    isGuideCreated 
                                        ? 'bg-white text-[#18181B]' 
                                        : 'bg-black text-white'
                                }`}
                            >
                                <div className="flex items-center space-x-2 h-full">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        isGuideCreated 
                                            ? 'border-[#18181B]' 
                                            : 'border-white'
                                    }`}>
                                        <div className={`w-2 h-2 rounded-full ${
                                            isGuideCreated 
                                                ? 'bg-[#18181B]' 
                                                : 'bg-white'
                                        }`}></div>
                                    </div>
                                    <span className="font-medium">
                                        {isCreatingGuide ? (
                                            <div className="flex items-center space-x-2">
                                                
                                                <span>Creating...</span>
                                            </div>
                                        ) : isGuideCreated ? (
                                            "View Guide"
                                        ) : (
                                            "Create Guide"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* 파일 목록 */}
                        <div className={`space-y-3 transition-opacity duration-300 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
                            {cards.map((card) => (
                                <ResourceCard
                                    key={card.id}
                                    name={card.name}
                                    description={card.description}
                                    tag={card.tag}
                                    date={card.date}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    // 카드가 없을 때: Upload file 카드만 표시
                    <div className="h-[52px] bg-[#FAFAFA] border-2 border-dashed border-[#E5E5E5] rounded-lg p-6 flex items-center justify-center">
                        <div className="flex items-center space-x-3">
                            <Plus
                                onClick={handlePlusClick}
                                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                            <span
                                onClick={handlePlusClick}
                                className="text-gray-700 font-medium cursor-pointer">Upload file</span>
                        </div>
                    </div>
                )}
                {showUploadModal && (
                    <UploadModal 
                        onAddCard={handleAddCard}
                        onClose={handleCloseModal}
                        categoryId="default-category"
                        uploadedBy="default-user"
                    />
                )}
            </div> 
        </div>
    );
    
}
export default ResourceSection;
