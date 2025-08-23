import React, { useState } from 'react';
import type { EmployeeProps } from '../types/DashBoardProps';

interface EmployeeListProps {
  employees: EmployeeProps[];
  categoryTitle: string;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, categoryTitle }) => {
  const [sortBy, setSortBy] = useState<'priority' | 'name' | 'department'>('priority');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pre-hire':
        return 'bg-blue-100 text-blue-800';
      case 'onboarding':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-gray-100 text-gray-800';
      case 'exit-process':
        return 'bg-orange-100 text-orange-800';
      case 'exited':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pre-hire':
        return '입사 전';
      case 'onboarding':
        return '온보딩';
      case 'active':
        return '재직중';
      case 'exit-process':
        return '퇴사 진행';
      case 'exited':
        return '퇴사 완료';
      default:
        return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return '긴급';
      case 'medium':
        return '보통';
      case 'low':
        return '여유';
      default:
        return priority;
    }
  };

  const sortEmployees = (employees: EmployeeProps[]) => {
    return [...employees].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'name':
          return a.name.localeCompare(b.name);
        case 'department':
          return a.department.localeCompare(b.department);
        default:
          return 0;
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedEmployees = sortEmployees(employees);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {categoryTitle} - 직원 목록 ({employees.length}명)
        </h3>
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">정렬:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="priority">우선순위</option>
            <option value="name">이름</option>
            <option value="department">부서</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {sortedEmployees.map(employee => (
          <div
            key={employee.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {employee.name.charAt(0)}
                  </span>
                </div>

                {/* Employee Info */}
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{employee.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {getStatusText(employee.status)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(employee.priority)}`}>
                      {getPriorityText(employee.priority)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {employee.department} • {employee.position}
                  </p>
                  {employee.hireDate && (
                    <p className="text-xs text-gray-500">
                      입사일: {formatDate(employee.hireDate)}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right">
                {/* Progress Bar */}
                {employee.progress !== undefined && (
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>진행률</span>
                      <span>{employee.progress}%</span>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${employee.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Next Action */}
                {employee.nextAction && (
                  <div className="text-sm">
                    <div className="text-gray-600">다음 액션:</div>
                    <div className="font-medium text-gray-900">{employee.nextAction}</div>
                    {employee.dueDate && (
                      <div className="text-xs text-gray-500">
                        마감일: {formatDate(employee.dueDate)}
                        {(() => {
                          const daysUntil = getDaysUntilDue(employee.dueDate);
                          if (daysUntil < 0) {
                            return <span className="text-red-600 ml-1">(지연)</span>;
                          } else if (daysUntil <= 3) {
                            return <span className="text-orange-600 ml-1">({daysUntil}일 남음)</span>;
                          } else {
                            return <span className="text-green-600 ml-1">({daysUntil}일 남음)</span>;
                          }
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-end space-x-2">
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                상세보기
              </button>
              {employee.status === 'pre-hire' && (
                <button className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  입사 처리
                </button>
              )}
              {employee.status === 'onboarding' && (
                <button className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  온보딩 완료
                </button>
              )}
              {employee.status === 'exit-process' && (
                <button className="px-3 py-1 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors">
                  퇴사 완료
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          이 카테고리에 해당하는 직원이 없습니다.
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
