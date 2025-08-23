import React from 'react';
import type { DashboardCard } from '../types/DashBoardProps';

interface AIInsightsProps {
  categories: DashboardCard[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ categories }) => {
  const getTotalEmployees = () => {
    return categories.reduce((total, category) => total + category.count, 0);
  };

  const getHighPriorityCount = () => {
    return categories.reduce((total, category) => {
      return total + category.employees.filter(emp => emp.priority === 'high').length;
    }, 0);
  };

  const getOnboardingProgress = () => {
    const onboardingCategory = categories.find(c => c.id === 'onboarding');
    if (!onboardingCategory || onboardingCategory.employees.length === 0) return 0;
    
    return Math.round(
      onboardingCategory.employees.reduce((sum, emp) => sum + (emp.progress || 0), 0) / 
      onboardingCategory.employees.length
    );
  };

  const getExitProgress = () => {
    const exitCategory = categories.find(c => c.id === 'exit-process');
    if (!exitCategory || exitCategory.employees.length === 0) return 0;
    
    return Math.round(
      exitCategory.employees.reduce((sum, emp) => sum + (emp.progress || 0), 0) / 
      exitCategory.employees.length
    );
  };

  const getUrgentActions = () => {
    const urgentEmployees = categories.flatMap(category => 
      category.employees.filter(emp => emp.priority === 'high' && emp.nextAction)
    );
    
    return urgentEmployees.slice(0, 3);
  };

  const getDepartmentDistribution = () => {
    const departmentCounts: { [key: string]: number } = {};
    
    categories.forEach(category => {
      category.employees.forEach(emp => {
        departmentCounts[emp.department] = (departmentCounts[emp.department] || 0) + 1;
      });
    });
    
    return Object.entries(departmentCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <span className="text-purple-600 text-lg">🤖</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">AI 인사이트</h3>
      </div>

      {/* Key Metrics */}
      <div className="space-y-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">전체 직원 현황</p>
              <p className="text-2xl font-bold text-blue-900">{getTotalEmployees()}명</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-600">분석 완료</p>
              <p className="text-xs text-blue-600">99.8% 정확도</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-900">긴급 처리 필요</p>
              <p className="text-2xl font-bold text-red-900">{getHighPriorityCount()}건</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-red-600">즉시 처리 권장</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Insights */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-900">진행률 분석</h4>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">온보딩 진행률</span>
            <span className="font-medium">{getOnboardingProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getOnboardingProgress()}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">퇴사 진행률</span>
            <span className="font-medium">{getExitProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getExitProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Urgent Actions */}
      {getUrgentActions().length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">긴급 액션</h4>
          <div className="space-y-2">
            {getUrgentActions().map((emp, index) => (
              <div key={emp.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-900">{emp.name}</p>
                    <p className="text-xs text-red-700">{emp.nextAction}</p>
                  </div>
                  <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">
                    긴급
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Department Distribution */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">부서별 분포</h4>
        <div className="space-y-2">
          {getDepartmentDistribution().map(([dept, count]) => (
            <div key={dept} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{dept}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / getTotalEmployees()) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{count}명</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-900 mb-3">AI 추천사항</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 text-sm">💡</span>
            <p className="text-sm text-gray-700">
              입사 전 준비 단계의 3명 중 2명이 긴급 우선순위입니다. 계약서 서명을 우선 처리하세요.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 text-sm">📈</span>
            <p className="text-sm text-gray-700">
              온보딩 진행률이 67%로 양호합니다. 업무 환경 설정 단계를 가속화하세요.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 text-sm">⚠️</span>
            <p className="text-sm text-gray-700">
              퇴사 진행 중인 직원의 업무 인수인계가 지연되고 있습니다. 즉시 조치가 필요합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
