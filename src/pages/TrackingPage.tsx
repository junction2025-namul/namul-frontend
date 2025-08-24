// src/pages/TrackingPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AddEmployeeModal from '../components/common/modal/AddEmployeeModal';
import { Trash2 } from 'lucide-react';

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
    const [showAddModal, setShowAddModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // localStorage 관련 함수들
    const saveEmployeesToStorage = (employeesData: Employee[]) => {
        localStorage.setItem('trackingEmployees', JSON.stringify(employeesData));
    };

    const loadEmployeesFromStorage = (): Employee[] | null => {
        const stored = localStorage.getItem('trackingEmployees');
        return stored ? JSON.parse(stored) : null;
    };

    // 초기 데이터 (localStorage에서 불러오거나 기본값 사용)
    const initialEmployees: Employee[] = [
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

    const [employees, setEmployees] = useState<Employee[]>(() => {
        const storedEmployees = loadEmployeesFromStorage();
        return storedEmployees || initialEmployees;
    });

    // employees가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        saveEmployeesToStorage(employees);
    }, [employees]);

    const filteredEmployees = employees.filter(emp => {
        if (selectedTab === 'new') return emp.status === 'onboarding';
        if (selectedTab === 'scheduled') return emp.status === 'scheduled';
        return true; // 'other' case
    });

    // 디버깅을 위한 콘솔 로그
    console.log('employees:', employees);
    console.log('selectedTab:', selectedTab);
    console.log('filteredEmployees:', filteredEmployees);
    console.log('selectedEmployees:', selectedEmployees);

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

    // 모달 핸들러들
    const handleAddEmployee = (employeeData: {
        name: string;
        email: string;
        job: string;
        department: string;
        status: 'onboarding' | 'scheduled';
        hireDate: string;
    }) => {
        // 날짜 형식 변환 (YYYY-MM-DD -> YYYY/MM/DD)
        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`;
        };

        const newEmployee: Employee = {
            id: Date.now(),
            name: employeeData.name,
            email: employeeData.email,
            job: employeeData.job,
            department: employeeData.department,
            status: employeeData.status,
            progress: employeeData.status === 'onboarding' ? '0% (0/10)' : '미전송',
            hireDate: formatDate(employeeData.hireDate)
        };
        
        setEmployees(prev => [...prev, newEmployee]);
    };

    const handleOpenAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    // 메일 전송 핸들러
    const handleSendOnboardingEmail = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000); // 3초 후 토스트 메시지 숨김
    };

    // 선택된 직원 삭제 핸들러
    const handleDeleteSelectedEmployees = () => {
        setEmployees(prev => prev.filter(emp => !selectedEmployees.includes(emp.id)));
        setSelectedEmployees([]); // 선택 상태 초기화
    };

    return (
        <div className="min-h-screen flex">
            {/* 좌측 사이드바 */}
            <div className="w-80 bg-white border-r border-[#E5E5E5]">
                {/* 헤더 */}
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
                        onClick={()=>navigate('/')}
                        className="px-6 py-2">
                        <div className="flex items-center px-3 py-2 space-x-3 cursor-pointer text-black-600 rounded-lg">
                        <span>📁 Home</span>
                        </div>
                    </div>
                    <div 
                        onClick={() => navigate('/tracking')}
                        className="px-6 py-2">
                        <div className="flex items-center px-3 py-2 space-x-3 bg-gray-100 cursor-pointer">
                        <span>🔎 Tracking</span>
                        </div>
                    </div>
            </nav>
            </div>

            {/* 우측 메인 콘텐츠 영역 */}
            <div className="flex-1 flex flex-col">
                {/* 상단 헤더 */}
                <div className="bg-white border-b border-[#E5E5E5] px-4 py-2 mb-3 flex justify-between items-center">
                    <h1 className="font-semibold text-xl">🔎 Tracking</h1>
                    <button 
                        onClick={handleOpenAddModal}
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Add Member
                    </button>
                </div>

                {/* 필터 탭 */}
                <div className="bg-white border-b border-[#E5E5E5] px-6">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setSelectedTab('new')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm ${
                                selectedTab === 'new' 
                                    ? 'border-black-500 text-black-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            신규 입사자
                        </button>
                        <button
                            onClick={() => setSelectedTab('scheduled')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm ${
                                selectedTab === 'scheduled' 
                                    ? 'border-black-500 text-black-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            입사 예정자
                        </button>
                        <button
                            onClick={() => setSelectedTab('other')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm ${
                                selectedTab === 'other' 
                                    ? 'border-black-500 text-black-600' 
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
                                        className="rounded border-gray-300 text-black bg-black checked:bg-black checked:border-black focus:ring-black"
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
                                                className="rounded border-gray-300 text-black bg-black checked:bg-black checked:border-black focus:ring-black"
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
                                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                                {employee.status === 'onboarding' ? '온보딩' : '입사 예정'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                                                {employee.progress}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            <div className="flex items-center space-x-2">
                                                <span>{employee.hireDate}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                     </div>
                 </div>

                 {/* 선택된 직원 액션 바 */}
                 {selectedEmployees.length > 0 && (
                     <div className="mx-[500px] mb-[10px] bg-gray-100 border border-gray-300 text-gray-800 px-6 py-3 flex justify-between items-center rounded-lg shadow-sm">
                         <span className="text-sm font-medium">
                             {selectedEmployees.length}명 선택됨
                         </span>
                         <div className="flex items-center space-x-3">
                             <button
                                 onClick={handleSendOnboardingEmail}
                                 className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                             >
                                 온보딩 메일 전송
                             </button>
                             <button 
                                 onClick={handleDeleteSelectedEmployees}
                                 className="text-gray-600 hover:text-gray-800 transition-colors p-1 rounded"
                             >
                                 <Trash2 size={16} />
                             </button>
                         </div>
                     </div>
                 )}
             </div>
            
                         {/* Add Employee Modal */}
             <AddEmployeeModal
                 isOpen={showAddModal}
                 onClose={handleCloseAddModal}
                 onAdd={handleAddEmployee}
             />

             {/* Toast Message */}
             {showToast && (
                 <div className="fixed right-[450px] transform -translate-x-1/2 bottom-20 bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                     메일이 전송되었습니다!
                 </div>
             )}
         </div>
     );
 };

export default TrackingPage;