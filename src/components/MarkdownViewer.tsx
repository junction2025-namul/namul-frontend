import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownViewer.css';

interface OnboardingItem {
  title: string;
  markdown: string;
  todo: string[];
}

interface MarkdownViewerProps {
  item: OnboardingItem;
  checkedState: boolean[];
  onToggle: (todoIndex: number) => void;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ item, checkedState, onToggle }) => {
  return (
    <div className="markdown-body p-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {item.markdown}
      </ReactMarkdown>
      
      {item.todo && item.todo.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">할 일 목록</h3>
          <ul className="list-none p-0">
            {item.todo.map((task, index) => (
              <li key={index} className="task-list-item flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={checkedState[index]}
                  onChange={() => onToggle(index)}
                  className="w-4 h-4 mr-3 accent-blue-600"
                />
                <span className={`text-md ${checkedState[index] ? 'line-through text-gray-500' : ''}`}>
                  {task}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MarkdownViewer;
