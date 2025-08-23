import React from 'react';
import type { DashboardCard } from '../types/DashBoardProps';

interface CategoryCardProps {
  category: DashboardCard;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isSelected, onClick }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-200 bg-blue-50 hover:bg-blue-100';
      case 'green':
        return 'border-green-200 bg-green-50 hover:bg-green-100';
      case 'orange':
        return 'border-orange-200 bg-orange-50 hover:bg-orange-100';
      case 'red':
        return 'border-red-200 bg-red-50 hover:bg-red-100';
      case 'gray':
        return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
      default:
        return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHighPriorityCount = () => {
    return category.employees.filter(emp => emp.priority === 'high').length;
  };

  const getMediumPriorityCount = () => {
    return category.employees.filter(emp => emp.priority === 'medium').length;
  };

  return (
    <div
      className={`
        border-2 rounded-xl p-4 cursor-pointer transition-all duration-200
        ${getColorClasses(category.color)}
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{category.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{category.title}</h3>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{category.count}</div>
          <div className="text-xs text-gray-500">명</div>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="space-y-2">
        {getHighPriorityCount() > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-red-600 font-medium">긴급</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              {getHighPriorityCount()}명
            </span>
          </div>
        )}
        
        {getMediumPriorityCount() > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-yellow-600 font-medium">보통</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              {getMediumPriorityCount()}명
            </span>
          </div>
        )}

        {category.count - getHighPriorityCount() - getMediumPriorityCount() > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600 font-medium">여유</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {category.count - getHighPriorityCount() - getMediumPriorityCount()}명
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar for Onboarding/Exit Process */}
      {(category.id === 'onboarding' || category.id === 'exit-process') && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>진행률</span>
            <span>
              {Math.round(
                category.employees.reduce((sum, emp) => sum + (emp.progress || 0), 0) / 
                category.employees.length
              )}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.round(
                  category.employees.reduce((sum, emp) => sum + (emp.progress || 0), 0) / 
                  category.employees.length
                )}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Next Actions */}
      {category.employees.some(emp => emp.nextAction) && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-600 mb-1">다음 액션</div>
          <div className="space-y-1">
            {category.employees
              .filter(emp => emp.nextAction)
              .slice(0, 2)
              .map(emp => (
                <div key={emp.id} className="text-xs text-gray-700 truncate">
                  • {emp.name}: {emp.nextAction}
                </div>
              ))}
            {category.employees.filter(emp => emp.nextAction).length > 2 && (
              <div className="text-xs text-gray-500">
                +{category.employees.filter(emp => emp.nextAction).length - 2}개 더...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
