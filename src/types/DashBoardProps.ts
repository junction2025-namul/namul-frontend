import type { ApiResponse } from "./CommonProps";

export interface EmployeeProps {
    id: string;
    name: string;
    department: string;
    position: string;
    status: 'pre-hire' | 'onboarding' | 'active' | 'exit-process' | 'exited';
    hireDate?: string;
    exitDate?: string;
    priority: 'high' | 'medium' | 'low';
    progress?: number;
    nextAction?: string;
    dueDate?: string;
}

export interface DashboardCard {
    id: string;
    title: string;
    description: string;
    count: number; // 이 카드에 해당 직원 몇 명 있는지 보여주는 개수
    color: string;
    icon: string;
    priority: 'high' | 'medium' | 'low';
    employees: EmployeeProps[];
}

export type DashboardResponse = ApiResponse<DashboardCard[]>;