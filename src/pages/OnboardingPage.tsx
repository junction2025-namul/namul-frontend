import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import MarkdownViewer from '../components/MarkdownViewer';

// 1. 데이터 타입 및 목업 데이터 정의
export interface OnboardingItem {
    title: string;
    markdown: string;
    todo: string[];
}

interface CheckedState {
    [key: string]: boolean[];
}

const OnboardingPage: React.FC = () => {
    const [onboardingData, setOnboardingData] = useState<OnboardingItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<OnboardingItem | null>(null);
    const [checkedState, setCheckedState] = useState<CheckedState>({});
    const [loading, setLoading] = useState(true);
    const [sidePanelInnerHeight, setSidePanelInnerHeight] = useState<number | string>('auto');
    const [mainAreaHeight, setMainAreaHeight] = useState<number | string>('auto');
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 온보딩 데이터 로드
        fetch('/onboarding.json')
            .then(response => response.json())
            .then((data: OnboardingItem[]) => {
                setOnboardingData(data);
                setSelectedItem(data[0]);
                setCheckedState(
                    data.reduce((acc, item) => {
                        acc[item.title] = item.todo.map(() => false);
                        return acc;
                    }, {} as CheckedState)
                );
                setLoading(false);
            });

        // AI 채팅 데이터 로드
        fetch('/aichatting.json')
            .then(response => response.json())
            .then((data) => {
                // assistant 메시지들만 추출하여 AI 응답 배열로 저장
                const assistantMessages = data.messages
                    .filter((msg: { role: string; message: string }) => msg.role === 'assistant')
                    .map((msg: { role: string; message: string }) => msg.message);
                setAiResponses(assistantMessages);
            });
    }, []);

    useEffect(() => {
        if (headerRef.current) {
            const headerHeight = headerRef.current.offsetHeight;
            const calculatedMainAreaHeight = window.innerHeight - headerHeight;
            setMainAreaHeight(calculatedMainAreaHeight > 0 ? calculatedMainAreaHeight : 'auto');

            const PADDING_IN_PX = 24 * 2; // p-6 = 1.5rem = 24px. top+bottom = 48px.
            const calculatedSidePanelInnerHeight = calculatedMainAreaHeight - PADDING_IN_PX;
            setSidePanelInnerHeight(calculatedSidePanelInnerHeight > 0 ? calculatedSidePanelInnerHeight : 'auto');
        }
    }, [loading]);

    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<Array<{id: number, text: string, isUser: boolean}>>([]);
    const [userMessageIndex, setUserMessageIndex] = useState(0);
    const [aiResponses, setAiResponses] = useState<string[]>([]);

    const handleApiPatch = (title: string, updatedTodos: boolean[]) => {
        console.log(`PATCH /api/onboarding/${title}`, {
            todos: updatedTodos
        });
        // 여기에 실제 fetch 또는 axios API 호출 로직을 추가합니다.
    };

    const handleToggleCheck = (title: string, todoIndex: number) => {
        const newCheckedState = {
            ...checkedState,
            [title]: checkedState[title].map((c, i) => i === todoIndex ? !c : c)
        };
        setCheckedState(newCheckedState);
        handleApiPatch(title, newCheckedState[title]);
    };
    
    const totalItems = onboardingData.reduce((sum, item) => sum + item.todo.length, 0);
    const completedItems = Object.values(checkedState)
        .flat()
        .filter(isChecked => isChecked).length;

    const sendChatMessage = () => {
        if (chatInput.trim()) {
            const userMessage = { id: Date.now(), text: chatInput, isUser: true };
            setChatMessages(prev => [...prev, userMessage]);
            setChatInput('');

            // 사용자 메시지 인덱스에 따른 AI 응답
            setTimeout(() => {
                let aiResponseText = '';
                
                // 디버깅을 위한 콘솔 로그
                console.log('userMessageIndex:', userMessageIndex);
                console.log('aiResponses:', aiResponses);
                console.log('aiResponses.length:', aiResponses.length);
                
                // JSON에서 가져온 AI 응답들 중에서 인덱스에 맞는 응답 사용
                if (userMessageIndex < aiResponses.length) {
                    aiResponseText = aiResponses[userMessageIndex];
                    console.log('Selected response:', aiResponseText);
                } else {
                    // 모든 응답을 다 사용한 경우 마지막 응답 반복
                    aiResponseText = aiResponses[aiResponses.length - 1] || "네, 도움이 필요하시군요! 어떤 부분에서 도움이 필요하신지 더 자세히 말씀해주세요.";
                    console.log('Using fallback response:', aiResponseText);
                }

                const aiResponse = { 
                    id: Date.now() + 1, 
                    text: aiResponseText, 
                    isUser: false 
                };
                setChatMessages(prev => [...prev, aiResponse]);
                
                // 사용자 메시지 인덱스 증가
                setUserMessageIndex(prev => prev + 1);
            }, 1000);
        }
    };

    const handleChatKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    };

    if (loading || !selectedItem) {
        return <div>Loading...</div>; // 또는 더 나은 로딩 컴포넌트
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="bg-[#E5E5E5] border-b border-gray-200" ref={headerRef}>
                <div className="bg-white px-6 py-3 flex justify-center items-center">
                    <div className="flex items-center space-x-4">
                        <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-sm font-semibold text-gray-700">체크리스트</span>
                            <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
                                {completedItems} / {totalItems}
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            <span className="text-sm font-semibold text-gray-700">온보딩 AI</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1">
                <div className="w-100 bg-white border-r border-[#E5E5E5]">
                    <div className="h-full p-6">
                        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 flex flex-col" style={{ height: sidePanelInnerHeight }}>
                            <div className="flex justify-between border-b border-[#E5E5E5] items-center pb-4 mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">체크리스트</h2>
                                <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
                                    {completedItems} / {totalItems}
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-4">
                                {onboardingData.map((section) => (
                                    <div key={section.title} onClick={() => setSelectedItem(section)} className={`cursor-pointer p-2 rounded-lg ${selectedItem.title === section.title ? 'bg-blue-100' : ''}`}>
                                        <h3 className="text-md font-semibold text-gray-800 mb-3">{section.title}</h3>
                                        {section.todo && section.todo.length > 0 && (
                                            <div className="space-y-3 pl-2">
                                                {section.todo.map((task, index) => (
                                                    <div key={index} className="flex items-center space-x-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={checkedState[section.title]?.[index] || false}
                                                            onChange={() => handleToggleCheck(section.title, index)}
                                                            className="w-4 h-4 border border-[#D4D4D4] rounded-[4px] accent-blue-600"
                                                        />
                                                        <span className={`text-sm ${checkedState[section.title]?.[index] ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                                            {task}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-white p-6 overflow-y-auto" style={{ height: mainAreaHeight }}>
                    {onboardingData.map((item, index) => (
                        <div key={item.title}>
                            <MarkdownViewer
                                item={item}
                                checkedState={checkedState[item.title]}
                                onToggle={(todoIndex) => handleToggleCheck(item.title, todoIndex)}
                            />
                            {index < onboardingData.length - 1 && <hr className="my-8 border-gray-200" />}
                        </div>
                    ))}
                </div>

                <div className="w-100 bg-white border-l border-[#E5E5E5]">
                    <div className="h-full p-6">
                        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 flex flex-col" style={{ height: sidePanelInnerHeight }}>
                            <div className="flex justify-between border-b border-[#E5E5E5] items-center pb-4 mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">글쓰기 AI</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[400px]">
                                {chatMessages.map((message) => (
                                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs px-4 py-2 rounded-lg ${message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
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

export default OnboardingPage;
