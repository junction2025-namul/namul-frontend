import { Plus } from "lucide-react";
import ResourceCard from "./ResourceCard";
import { useState } from "react";
import UploadModal from "../modal/UploadModal";
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
    
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);

    const hasCards = cards.length > 0;

    // Plus 버튼 클릭 핸들러
    const handlePlusClick = () => {
        setShowUploadModal(true);
    };

    // 모달에서 카드 추가 핸들러
    const handleAddCard = (newCard: Omit<Card, 'id'>) => {
        const cardWithId = {
            ...newCard,
            id: Date.now() // 고유 ID 생성
        };
        setCards(prev => [...prev, cardWithId]);
        setShowUploadModal(false);
    };

    // 모달 닫기 핸들러
    const handleCloseModal = () => {
        setShowUploadModal(false);
    };

    return (
        <div className="grid grid-flex flex-col max-w-[350px] px-6">
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
                        <div className="flex items-center justify-between">
                            <div className="bg-[#FAFAFA] text-[#18181B] h-[52px] rounded-lg p-4 border border-[#E5E5E5]">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span className="font-semibold">Preview</span>
                                </div>
                            </div>
                            {/* Update 버튼 */}
                            <button className="bg-gray-800 text-white px-3 py-1 h-[52px] rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors">
                                <img src={ic_upload} />
                                <span className="text-sm font-semibold">Update</span>
                            </button>
                        </div>
                        {/* 파일 목록 */}
                        <div className="space-y-3">
                            {cards.map((card) => (
                                <ResourceCard
                                    key={card.id}
                                    name={card.name}
                                    description={card.description}
                                    tag={card.tag}
                                    date={card.date}
                                    type={card.type}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    // 카드가 없을 때: Upload file 카드만 표시
                    <div className="bg-[#FAFAFA] border-2 border-dashed border-[#E5E5E5] rounded-lg p-6 flex items-center justify-center">
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
                    />
                )}
            </div> 
        </div>
    );
}

export default ResourceSection;