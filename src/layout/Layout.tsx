<<<<<<< HEAD
import { Outlet } from 'react-router';
=======
import { useState } from 'react';
import ChecklistPanel from '../components/panels/ChecklistPanel';
import MarkdownViewer from '../components/panels/MarkdownViewer';
import AiAssistPanel from '../components/panels/AiAssistPanel';
>>>>>>> 27c51acc647df454435ba8ab4d71dd7483bd91a5

export default function Layout() {
    const [showChecklist, setShowChecklist] = useState(true);
    const [showAiAssist, setShowAiAssist] = useState(true);

    return (
<<<<<<< HEAD
        <div className="min-h-screen bg-white">
            <Outlet />
=======
        <div className="flex flex-col w-screen h-screen">
            <div className="p-2 flex gap-2">
                <button onClick={() => setShowChecklist((prev) => !prev)}>[체크리스트]</button>
                <button onClick={() => setShowAiAssist((prev) => !prev)}>[온보딩 AI]</button>
            </div>
            <div className="flex flex-1">
                {showChecklist && (
                    <div className="w-1/4 border-r p-4">
                        <ChecklistPanel />
                    </div>
                )}
                <div className="flex-1 p-4 overflow-auto">
                    <MarkdownViewer />
                </div>
                {showAiAssist && (
                    <div className="w-1/4 border-l p-4">
                        <AiAssistPanel />
                    </div>
                )}
            </div>
>>>>>>> 27c51acc647df454435ba8ab4d71dd7483bd91a5
        </div>
    );
}
