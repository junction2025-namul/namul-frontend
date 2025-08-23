// src/pages/TrackingPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Search, Filter } from 'lucide-react';

type Employee = {
    id: number;
    name: string;
    email: string;
    job: string;
    department: string;
    status: 'onboarding' | 'scheduled';
    progress: string;
    hireDate: string;
    hasNotification?: boolean;
}

const TrackingPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState<'new' | 'scheduled' | 'other'>('new');
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

    // Mock data - 실제로는 API에서 받아옴
    const employees: Employee[] = [
        {
            id: 1,
            name: 'Emily Johnson',
            email: 'johnson@example.com',
            job: '프로덕트 디자이너',
            department: '프로덕트',
            status: 'onboarding',
            progress: '60% (6/10)',
            hireDate: '25/12/12 (D+12)',
            hasNotification: true
        },
        {
            id: 2,
            name: 'Emily Johnson',
            email: 'johnson@example.com',
            job: '프로덕트 디자이너',
            department: '프로덕트',
            status: 'onboarding',
            progress: '60% (6/10)',
            hireDate: '25/12/12 (D+12)'
        },
        {
            id: 3,
            name: 'Emily Johnson',
            email: 'johnson@example.com',
            job: '프로덕트 디자이너',
            department: '프로덕트',
            status: 'scheduled',
            progress: '미전송',
            hireDate: '2025/12/12'
        },
        {
            id: 4,
            name: 'Emily Johnson',
            email: 'johnson@example.com',
            job: '프로덕트 디자이너',
            department: '프로덕트',
            status: 'scheduled',
            progress: '미전송',
            hireDate: '2025/12/12'
        }
    ];

    const filteredEmployees = employees.filter(emp => {
        if (selectedTab === 'new') return emp.status === 'onboarding';
        if (selectedTab === 'scheduled') return emp.status === 'scheduled';
        return true; // 'other' case
    });

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedEmployees(filteredEmployees.map(emp => emp.id));
        } else {
            setSelectedEmployees([]);
        }
    };

    const handleSelectEmployee = (employeeId: number, checked: boolean) => {
        if (checked) {
            setSelectedEmployees(prev => [...prev, employeeId]);
        } else {
            setSelectedEmployees(prev => prev.filter(id => id !== employeeId));
        }
    };

    const isAllSelected = filteredEmployees.length > 0 && selectedEmployees.length === filteredEmployees.length;

    return (
        <div className="min-h-screen flex">
            {/* 좌측 사이드바 */}
            <div className="w-64 bg-white border-r border-[#E5E5E5]">
                {/* 헤더 */}
                <div className="px-6 py-4 border-b border-[#E5E5E5]">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-black rounded"></div>
                        <span className="font-inter">Team Namul</span>
                    </div>
                </div>

                {/* 네비게이션 메뉴 */}
                <nav className="mt-6">
                    <div 
                        onClick={() => navigate('/')}
                        className="px-6 py-2">
                        <div className="flex items-center space-x-3 cursor-pointer">
                            <span>📁 Home</span>
                        </div>
                    </div>
                    <div className="px-6 py-2">
                        <div className="flex items-center space-x-3 cursor-pointer bg-blue-50 text-blue-600 rounded-lg mx-2">
                            <span>🔎 Tracking</span>
                        </div>
                    </div>
                </nav>
            </div>

            {/* 우측 메인 콘텐츠 영역 */}
            <div className="flex-1 flex flex-col">
                {/* 상단 헤더 */}
                <div className="bg-white border-b border-[#E5E5E5] p-4 flex justify-between items-center">
                    <h1 className="font-semibold text-xl">Tracking</h1>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        Add
                    </button>
                </div>

                {/* 필터 탭 */}
                <div className="bg-white border-b border-[#E5E5E5] px-6">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setSelectedTab('new')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm ${
                                selectedTab === 'new' 
                                    ? 'border-blue-500 text-blue-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            신규 입사자
                        </button>
                        <button
                            onClick={() => setSelectedTab('scheduled')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm ${
                                selectedTab === 'scheduled' 
                                    ? 'border-blue-500 text-blue-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            입사 예정자
                        </button>
                        <button
                            onClick={() => setSelectedTab('other')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm ${
                                selectedTab === 'other' 
                                    ? 'border-blue-500 text-blue-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            그외
                        </button>
                    </div>
                </div>

                {/* 테이블 */}
                <div className="flex-1 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={isAllSelected}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">구성원</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">직무/부서</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">상태</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">온보딩 진행</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">입사(예정)일</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredEmployees.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedEmployees.includes(employee.id)}
                                                onChange={(e) => handleSelectEmployee(employee.id, e.target.checked)}
                                                className="rounded border-gray-300"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{employee.name}</div>
                                                    <div className="text-sm text-gray-500">{employee.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {employee.job}/{employee.department}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                employee.status === 'onboarding' 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {employee.status === 'onboarding' ? '온보딩' : '입사 예정'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {employee.progress}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="flex items-center space-x-2">
                                                <span>{employee.hireDate}</span>
                                                {employee.hasNotification && (
                                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackingPage;