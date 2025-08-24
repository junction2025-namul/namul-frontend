import React, { useState } from 'react';
import { X } from 'lucide-react';

type EmployeeFormData = {
    name: string;
    email: string;
    expectedStartDate: string;
    department: string;
    career: string;
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
        expectedStartDate: '',
        department: '',
        career: '',
    }); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.expectedStartDate && formData.department) {
            onAdd(formData);
            setFormData({
                name: '',
                email: '',
                expectedStartDate: '',
                department: '',
                career: '',
            });
            onClose();
        }
    };

    // 숫자만 → YYYY/MM/DD 자동 포맷
    const formatDateText = (raw: string) => {
        let v = raw.replace(/\D/g, '');      // 숫자만
        if (v.length > 8) v = v.slice(0, 8); // 최대 8자리
        if (v.length > 6) return `${v.slice(0, 4)}/${v.slice(4, 6)}/${v.slice(6)}`;
        if (v.length > 4) return `${v.slice(0, 4)}/${v.slice(4)}`;
        return v;
    };

    const handleChange = (field: keyof EmployeeFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add member</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="border-t border-[#E5E5E5] space-y-4 pt-4">
                    <div>
                        <label className="block text-sm mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-[#E5E5E5] rounded-[10px] focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-[#E5E5E5] rounded-[10px] focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Career
                        </label>
                        <input
                            type="career"
                            value={formData.career}
                            onChange={(e) => handleChange('career', e.target.value)}
                            className="w-full px-3 py-2 border border-[#E5E5E5] rounded-[10px] focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Expected Start Date
                        </label>
                        <input
                            type="text"
                            placeholder="YYYY/MM/DD"
                            value={formData.expectedStartDate}
                            onChange={(e) => handleChange('expectedStartDate', formatDateText(e.target.value))}
                            className="w-full px-3 py-2 border border-[#E5E5E5] rounded-[10px] focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Department
                        </label>
                        <select
                            value={formData.department}
                            onChange={(e) => handleChange('department', e.target.value)}
                            className="w-full px-3 py-2 border border-[#E5E5E5] text-gray-500 rounded-[10px] focus:outline-none"
                            required
                        >
                            <option value="">role</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Design">ManageDesign</option>
                            <option value="Product/Business">Product/Business</option>
                            <option value="Sales/Marketing">Sales/Marketing</option>
                            <option value="HR/Finance">HR/Finance</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white rounded-md transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
