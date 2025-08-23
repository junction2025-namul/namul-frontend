import React, { useState } from 'react';
import { Send } from 'lucide-react';

type ChecklistItem = {
    id: number;
    text: string;
    completed: boolean;
    category: string;
}



const ChecklistPage: React.FC = () => {
    const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
        { id: 1, text: '태스크1', completed: false, category: 'onboarding' },
        { id: 2, text: '태스크2', completed: false, category: 'onboarding' },
        { id: 3, text: '태스크3', completed: false, category: 'onboarding' },
        { id: 4, text: '태스크4', completed: false, category: 'scheduled' },
        { id: 5, text: '태스크5', completed: false, category: 'scheduled' },
        { id: 6, text: '태스크6', completed: false, category: 'scheduled' },
        { id: 7, text: '태스크7', completed: false, category: 'scheduled' },
    ]);
    
    // AI 입력 관련 상태
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { id: 1, text: '안녕하세요! 온보딩 관련 도움이 필요하시면 언제든 말씀해주세요.', isUser: false }
    ]);

    // 체크리스트 아이템 토글
    const toggleItem = (id: number) => {
        setChecklistItems(prev => 
            prev.map(item => 
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    // AI 입력 전송
    const sendChatMessage = () => {
        if (chatInput.trim()) {
            const userMessage = {
                id: Date.now(),
                text: chatInput,
                isUser: true
            };
            setChatMessages(prev => [...prev, userMessage]);
            setChatInput('');

            // AI 답장 시뮬레이션
            setTimeout(() => {
                const aiResponse = {
                    id: Date.now() + 1,
                    text: '네, 도움이 필요하시군요! 어떤 부분에서 도움이 필요하신지 더 자세히 말씀해주세요.',
                    isUser: false
                };
                setChatMessages(prev => [...prev, aiResponse]);
            }, 1000);
        }
    };

    const handleChatKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* 상단 헤더 */}
            <div className="bg-[#E5E5E5] border-b border-gray-200">
                {/* 미리보기 텍스트 */}
                <div className="text-center py-3">
                    <span className="text-sm text-gray-600">미리보기 화면입니다.</span>
                </div>
                
                {/* 회색 바 */}
                <div className="bg-white px-6 py-3 flex justify-center items-center">
                    <div className="flex items-center space-x-4">
                        {/* 체크리스트 카드 */}
                        <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-2">
                            <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
                                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">체크리스트</span>
                            <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
                                {checklistItems.filter(item => item.completed).length} / {checklistItems.length}
                            </div>
                        </div>
                        
                        {/* 온보딩 AI 카드 */}
                        <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-700">온보딩 AI</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="flex flex-1">
                {/* 좌측 사이드바 */}
                <div className="w-100 bg-white border-r border-[#E5E5E5]">

                {/* 체크리스트 영역 */}
                <div className="h-full p-6">
                    <div className="h-full bg-white rounded-lg border border-[#E5E5E5] p-6 flex flex-col">
                        <div className="flex justify-between border-b border-[#E5E5E5] items-center pb-4 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">체크리스트</h2>
                            <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
                                {checklistItems.filter(item => item.completed).length} / {checklistItems.length}
                            </div>
                        </div>

                        {/* 체크리스트 아이템들 */}
                        <div className="flex-1 overflow-y-auto space-y-3">
                            {checklistItems.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="flex items-center space-x-3"
                                >
                                    <input
                                        type="checkbox"
                                        checked={item.completed}
                                        onChange={() => toggleItem(item.id)}
                                        className="w-4 h-4 border border-[#D4D4D4] rounded-[4px]"
                                    />
                                    <span className={`text-sm ${
                                        item.completed 
                                            ? 'line-through text-gray-500' 
                                            : 'text-gray-900'
                                    }`}>
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 중앙 영역 - 비워둠 */}
            <div className="flex-1 bg-gray-50 p-6">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500">
                        <h2 className="text-xl font-medium mb-2">중앙 영역</h2>
                        <p className="text-sm">내용이 미정입니다.</p>
                    </div>
                </div>
            </div>

            {/* 우측 AI 글쓰기 영역 */}
            <div className="w-100 bg-white border-l border-[#E5E5E5]">

                {/* AI 글쓰기 영역 */}
                <div className="h-full p-6">
                    <div className="h-full bg-white rounded-lg border border-[#E5E5E5] p-6 flex flex-col">
                        <div className="flex justify-between border-b border-[#E5E5E5] items-center pb-4 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">글쓰기 AI</h2>
                        </div>

                        {/* 채팅 메시지 영역 */}
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[400px]">
                            {chatMessages.map((message) => (
                                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                                        message.isUser 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-100 text-gray-900'
                                    }`}>
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 채팅 입력 영역 */}
                        <div className="flex items-center space-x-3">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={handleChatKeyPress}
                                placeholder="어떤 도움이 필요한가요?"
                                className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none text-sm placeholder-gray-500"
                            />
                            <button
                                onClick={sendChatMessage}
                                className="w-10 h-10 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ChecklistPage;
