import React, { useState, useEffect, useRef } from 'react';
import { Send, Upload } from 'lucide-react';
import MarkdownViewer from '../components/MarkdownViewer';

// 1. 데이터 타입 및 목업 데이터 정의
export interface PreboardingItem {
  title: string;
  markdown: string;
  todo: string[];
}

interface CheckedState {
    [key: string]: boolean[];
}

const PreboardingPage: React.FC = () => {
    const [preboardingData, setPreboardingData] = useState<PreboardingItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<PreboardingItem | null>(null);
    const [checkedState, setCheckedState] = useState<CheckedState>({});
    const [loading, setLoading] = useState(true);
    const [sidePanelInnerHeight, setSidePanelInnerHeight] = useState<number | string>('auto');
    const [mainAreaHeight, setMainAreaHeight] = useState<number | string>('auto');
    const [isChecklistPanelOpen, setIsChecklistPanelOpen] = useState(true);
    const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);
    const headerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleChecklistPanel = () => {
        setIsChecklistPanelOpen(prev => !prev);
    };

    const toggleAiPanel = () => {
        setIsAiPanelOpen(prev => !prev);
    };

    useEffect(() => {
        fetch('/preboarding.json')
            .then(response => response.json())
            .then((data: PreboardingItem[]) => {
                setPreboardingData(data);
                setSelectedItem(data[0]);
                setCheckedState(
                    data.reduce((acc, item) => {
                        acc[item.title] = item.todo.map(() => false);
                        return acc;
                    }, {} as CheckedState)
                );
                setLoading(false);
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
    const [chatMessages, setChatMessages] = useState([
        { id: 1, text: '안녕하세요! 온보딩 관련 도움이 필요하시면 언제든 말씀해주세요.', isUser: false }
    ]);

    const handleApiPatch = (title: string, updatedTodos: boolean[]) => {
        console.log(`PATCH /api/preboarding/${title}`, {
            todos: updatedTodos
        });
        // 여기에 실제 fetch 또는 axios API 호출 로직을 추가합니다.
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleToggleCheck = (title: string, todoIndex: number) => {
        const section = preboardingData.find(s => s.title === title);
        const task = section?.todo[todoIndex];

        if (task && task.includes('제출')) {
            handleUploadClick();
        }

        const newCheckedState = {
            ...checkedState,
            [title]: checkedState[title].map((c, i) => i === todoIndex ? !c : c)
        };
        setCheckedState(newCheckedState);
        handleApiPatch(title, newCheckedState[title]);
    };
    
    const totalItems = preboardingData.reduce((sum, item) => sum + item.todo.length, 0);
    const completedItems = Object.values(checkedState)
      .flat()
      .filter(isChecked => isChecked).length;

    const sendChatMessage = () => {
        if (chatInput.trim()) {
            const userMessage = { id: Date.now(), text: chatInput, isUser: true };
            setChatMessages(prev => [...prev, userMessage]);
            setChatInput('');

            setTimeout(() => {
                const aiResponse = { id: Date.now() + 1, text: '네, 도움이 필요하시군요! 어떤 부분에서 도움이 필요하신지 더 자세히 말씀해주세요.', isUser: false };
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

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // Handle the selected files
            console.log(e.target.files);
        }
    };

    if (loading || !selectedItem) {
        return <div>Loading...</div>; // 또는 더 나은 로딩 컴포넌트
    }

    return (
        <div className="min-h-screen flex flex-col">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelected}
                className="hidden"
                multiple
            />
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
                                {preboardingData.map((section) => (
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
                    {preboardingData.map((item, index) => (
                        <div key={item.title}>
                            <MarkdownViewer
                                item={item}
                                checkedState={checkedState[item.title]}
                                onToggle={(todoIndex) => handleToggleCheck(item.title, todoIndex)}
                            />
                            {index < preboardingData.length - 1 && <hr className="my-8 border-gray-200" />}
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

export default PreboardingPage;
