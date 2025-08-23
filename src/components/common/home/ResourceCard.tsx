import { useState } from "react";
import { File } from "lucide-react";

type ResourceCardProps = {
    name: string;
    description?: string;
    tag?: string;
    date: string;
    onClick?: React.ReactNode;
    
}

const ResourceCard: React.FC<ResourceCardProps> = ({
    name,
    description,
    tag,
    date,
    onClick,
}) => {
    // const [,] = useState< | null>(null);

    return (
        <div className="bg-white rounded-lg p-4 border border-[#E5E5E5]">
            {/* 상단 영역 */}
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                {/* 아이콘 + 제목을 한 줄 */}
                <h2 className="font-semibold flex items-center space-x-2 font-medium text-gray-900">
                    <File className="w-5 h-5 text-[#404040]" />
                    <span>{name}</span>
                </h2>

                {/* 설명 */}
                {description && (
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                )}

                {/* 태그 */}
                {tag && (
                    <span className="font-medium inline-block mt-2 text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                    {tag}
                    </span>
                )}
                </div>

                {/* 우측 액션 */}
                {onClick && <div>{onClick}</div>}
            </div>

            {/* 구분선 */}
            <div className="border-b border-[#E5E5E5] my-3"></div>

            {/* 날짜 */}
            <p className="text-sm text-gray-500">{date}</p>
        </div>
    );
}   

export default ResourceCard;