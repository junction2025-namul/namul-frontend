const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center space-x-1">
            <span className="h-3 w-3 animate-bounce-delay-1 rounded-full bg-white" />
            <span className="h-3 w-3 animate-bounce-delay-2 rounded-full bg-white" />
            <span className="h-3 w-3 animate-bounce-delay-3 rounded-full bg-white" />
        </div>
    );
};

export default LoadingSpinner;
