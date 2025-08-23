import React, { useState } from 'react';
import { X } from 'lucide-react';

type EmployeeFormData = {
    name: string;
    email: string;
    job: string;
    department: string;
    status: 'onboarding' | 'scheduled';
    hireDate: string;
}

type AddEmployeeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (employee: EmployeeFormData) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState<EmployeeFormData>({
        name: '',
        email: '',
        job: '',
        department: '',
        status: 'onboarding',
        hireDate: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.job && formData.department && formData.hireDate) {
            onAdd(formData);
            setFormData({
                name: '',
                email: '',
                job: '',
                department: '',
                status: 'onboarding',
                hireDate: ''
            });
            onClose();
        }
    };

    const handleChange = (field: keyof EmployeeFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">직원 추가</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            이름 *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            이메일 *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            직무 *
                        </label>
                        <input
                            type="text"
                            value={formData.job}
                            onChange={(e) => handleChange('job', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            부서 *
                        </label>
                        <input
                            type="text"
                            value={formData.department}
                            onChange={(e) => handleChange('department', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            상태 *
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleChange('status', e.target.value as 'onboarding' | 'scheduled')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
                            required
                        >
                            <option value="onboarding">온보딩</option>
                            <option value="scheduled">입사 예정</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            입사(예정)일 *
                        </label>
                        <input
                            type="date"
                            value={formData.hireDate}
                            onChange={(e) => handleChange('hireDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded-md transition-colors"
                        >
                            추가
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
