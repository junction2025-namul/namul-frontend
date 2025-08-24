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
    const [isChecklistPanelOpen, setIsChecklistPanelOpen] = useState(true);
    const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);
    const headerRef = useRef<HTMLDivElement>(null);

    const toggleChecklistPanel = () => {
        setIsChecklistPanelOpen(prev => !prev);
    };

    const toggleAiPanel = () => {
        setIsAiPanelOpen(prev => !prev);
    };

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
                setChatData(data);
                // 초기 메시지들을 채팅에 추가
                const initialMessages = data.messages.map((msg: any, index: number) => ({
                    id: index + 1,
                    text: msg.message,
                    isUser: msg.role === 'user'
                }));
                setChatMessages(initialMessages);
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
    const [chatData, setChatData] = useState<any>(null);

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

            // 사용자 입력에 따른 다양한 AI 응답
            setTimeout(() => {
                let aiResponse = '';
                
                // 사용자 입력에 따라 다른 응답 생성
                if (chatInput.toLowerCase().includes('문서') || chatInput.toLowerCase().includes('찾')) {
                    aiResponse = '네! 어떤 종류의 문서를 찾고 계신가요? 예를 들어 연차 신청, 개발 가이드, 회사 규정 등이 있어요. 구체적으로 말씀해주시면 바로 찾아드릴게요! 📚';
                } else if (chatInput.toLowerCase().includes('연차') || chatInput.toLowerCase().includes('휴가')) {
                    aiResponse = '연차/휴가 신청 관련 문서를 찾아드릴게요!\n\n📋 **휴가신청 가이드** - HR-2024-001.pdf\n   → 연차 신청부터 승인까지 전체 프로세스\n\n이 문서를 공유해드릴까요?';
                } else if (chatInput.toLowerCase().includes('개발') || chatInput.toLowerCase().includes('코딩')) {
                    aiResponse = '개발 관련 문서들을 찾아드릴게요!\n\n💻 **개발팀 코딩 컨벤션** - DEV-STD-2024-003.md\n🛠️ **개발환경 구축 가이드** - DEV-SETUP-2024-001.md\n🐳 **Docker 환경 설정** - DEV-DOCKER-2024-002.md\n\n어떤 문서가 가장 필요하신가요?';
                } else if (chatInput.toLowerCase().includes('계정') || chatInput.toLowerCase().includes('권한')) {
                    aiResponse = '계정 및 권한 관련 문서들을 찾아드릴게요!\n\n🔑 **사내 시스템 계정 발급 절차** - IT-PROC-001.pdf\n🔑 **GitLab 권한 신청 프로세스** - IT-ACCESS-2024-005.pdf\n💾 **DB 접근 권한 신청서** - DB-ACCESS-FORM-001.pdf\n\n어떤 권한이 필요하신가요?';
                } else if (chatInput.toLowerCase().includes('조직') || chatInput.toLowerCase().includes('연락처')) {
                    aiResponse = '조직도 및 연락처 관련 문서들을 찾아드릴게요!\n\n🏢 **회사 조직도** - ORG-CHART-2024-Q3.pdf\n📞 **임직원 연락처** - CONTACT-LIST-2024-008.xlsx\n\n이 문서들을 공유해드릴까요?';
                } else if (chatInput.toLowerCase().includes('규정') || chatInput.toLowerCase().includes('시간')) {
                    aiResponse = '회사 규정 및 근무시간 관련 문서들을 찾아드릴게요!\n\n🍽️ **근무시간 및 점심시간 안내** - WORK-SCHEDULE-2024-001.pdf\n📋 **신입사원 필수 규정집** - HR-REGULATION-2024-NEW.pdf\n\n이 문서들을 공유해드릴까요?';
                } else {
                    aiResponse = '네, 도움이 필요하시군요! 어떤 부분에서 도움이 필요하신지 더 자세히 말씀해주세요. 예를 들어:\n• 연차/휴가 신청\n• 개발 환경 설정\n• 계정 권한 신청\n• 회사 규정 확인\n\n무엇이든 편하게 말씀해주세요! 😊';
                }

                const aiMessage = { 
                    id: Date.now() + 1, 
                    text: aiResponse, 
                    isUser: false 
                };
                setChatMessages(prev => [...prev, aiMessage]);
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
                        <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-2 cursor-pointer" onClick={toggleChecklistPanel}>
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-sm font-semibold text-gray-700">체크리스트</span>
                            <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm">
                                {completedItems} / {totalItems}
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-2 cursor-pointer" onClick={toggleAiPanel}>
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            <span className="text-sm font-semibold text-gray-700">온보딩 AI</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1">
                <div className={`bg-white border-r border-[#E5E5E5] transition-all duration-300 ease-in-out overflow-hidden ${isChecklistPanelOpen ? 'w-100' : 'w-0'}`}>
                    <div className="h-full p-6">
                        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 flex flex-col whitespace-nowrap" style={{ height: sidePanelInnerHeight }}>
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

                <div className={`bg-white border-l border-[#E5E5E5] transition-all duration-300 ease-in-out overflow-hidden ${isAiPanelOpen ? 'w-100' : 'w-0'}`}>
                    <div className="h-full p-6">
                        <div className="bg-white rounded-lg border border-[#E5E5E5] p-6 flex flex-col whitespace-nowrap" style={{ height: sidePanelInnerHeight }}>
                            <div className="flex justify-between border-b border-[#E5E5E5] items-center pb-4 mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">온보딩 AI</h2>
                            </div>
                            <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-[400px]">
                                {chatMessages.map((message) => (
                                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-sm px-4 py-2 rounded-lg ${message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                                            <p className="text-sm whitespace-normal">{message.text}</p>
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
