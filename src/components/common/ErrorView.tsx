interface ErrorViewProps {
    error?: Error | string;
    onRetry?: () => void;
}

export default function ErrorView({ error, onRetry }: ErrorViewProps) {
    const errorMessage = error instanceof Error ? error.message : error || '알 수 없는 오류가 발생했습니다.';
    
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="text-red-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">오류가 발생했습니다</h3>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    다시 시도
                </button>
            )}
        </div>
    );
}