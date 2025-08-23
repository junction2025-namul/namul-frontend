import React from 'react';

const ProcessTimeline: React.FC = () => {
  const timelineEvents = [
    {
      id: 1,
      date: '2024-01-15',
      title: '김신입 계약서 서명',
      description: '개발팀 주니어 개발자 계약서 서명 완료',
      type: 'success',
      category: '입사 전'
    },
    {
      id: 2,
      date: '2024-01-16',
      title: '정개발자 온보딩 시작',
      description: '시니어 개발자 온보딩 프로세스 시작',
      type: 'info',
      category: '온보딩'
    },
    {
      id: 3,
      date: '2024-01-17',
      title: '이마케터 서류 제출',
      description: '마케팅 매니저 서류 제출 완료',
      type: 'success',
      category: '입사 전'
    },
    {
      id: 4,
      date: '2024-01-18',
      title: '한퇴사 퇴사 신청',
      description: '영업팀 사원 퇴사 신청 접수',
      type: 'warning',
      category: '퇴사'
    },
    {
      id: 5,
      date: '2024-01-19',
      title: '최영업 부서 소개',
      description: '영업 매니저 부서 소개 및 멘토 배정',
      type: 'info',
      category: '온보딩'
    },
    {
      id: 6,
      date: '2024-01-20',
      title: '박이전 퇴사 완료',
      description: '마케팅팀 매니저 퇴사 절차 완료',
      type: 'success',
      category: '퇴사'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '입사 전':
        return 'bg-blue-100 text-blue-800';
      case '온보딩':
        return 'bg-green-100 text-green-800';
      case '퇴사':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
          <span className="text-indigo-600 text-lg">📅</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">최근 활동</h3>
      </div>

      <div className="space-y-4">
        {timelineEvents.map((event, index) => (
          <div key={event.id} className="relative">
            {/* Timeline Line */}
            {index < timelineEvents.length - 1 && (
              <div className="absolute left-4 top-8 w-0.5 h-12 bg-gray-200"></div>
            )}
            
            <div className="flex items-start space-x-4">
              {/* Timeline Dot */}
              <div className={`w-8 h-8 rounded-full ${getTypeColor(event.type)} flex items-center justify-center flex-shrink-0`}>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{event.title}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <p className="text-xs text-gray-500">{formatDate(event.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">오늘의 통계</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-900">3</div>
            <div className="text-xs text-blue-600">완료된 작업</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-lg font-bold text-yellow-900">2</div>
            <div className="text-xs text-yellow-600">진행중인 작업</div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">예정된 작업</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-orange-900">김신입 계약서 서명</p>
              <p className="text-xs text-orange-700">마감일: 2024-01-25</p>
            </div>
            <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
              5일 남음
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-blue-900">정개발자 업무 환경 설정</p>
              <p className="text-xs text-blue-700">마감일: 2024-01-20</p>
            </div>
            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
              오늘
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
