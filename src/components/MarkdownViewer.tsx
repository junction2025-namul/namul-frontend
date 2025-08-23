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
      
      <hr className="my-6" />

      <h2 className="text-xl font-bold mb-4">할 일 목록</h2>
      <ul className="list-none p-0">
        {item.todo.map((task, index) => (
          <li key={index} className="task-list-item flex items-center mb-2">
            <input
              type="checkbox"
              checked={checkedState[index]}
              onChange={() => onToggle(index)}
              className="w-4 h-4 mr-3 accent-blue-600"
            />
            <span className={checkedState[index] ? 'line-through text-gray-500' : ''}>
              {task}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarkdownViewer;
