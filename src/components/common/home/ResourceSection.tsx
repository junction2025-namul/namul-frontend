import { Plus } from "lucide-react";
import ResourceCard from "./ResourceCard";

type ResourceSection = {
    title: string;
    
}

const ResourceSection = () => {

    return (
        <div className="flex flex-col min-x-[280px]">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">공통</p>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">4</span>
                </div>
                <Plus className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
            

            {/* 메인 콘텐츠 */}
            <div className="flex-1 p-6 space-y-4">
                {/* Preview 섹션 */}
                <div className="bg-white rounded-lg p-4 border border-[#E5E5E5]">
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
                    <ResourceCard
                        name="File name"
                        description="3605 Parker Rd."
                        tag="미리 공유"
                        date="Aug 23rd 2025"
                        onClick=""
                    />
                    {/* <div className="bg-white rounded-lg p-4 shadow-sm">
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
                    </div> */}
                </div>
            </div> 
        </div>
    );
}

export default ResourceSection;