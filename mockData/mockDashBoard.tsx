// mock/dashboard.ts
import type { DashboardResponse } from "../src/types/DashBoardProps";

export const mockDashboardData: DashboardResponse = {
  result: true,
  code: "SUCCESS200",
  message: "대시보드 데이터 불러오기 성공",
  data: [
    {
      id: "pre-hire",
      title: "입사 전 준비",
      description: "계약서 서명 및 입사 전 준비사항",
      count: 5, // 실제 employees는 3명 → mismatch
      priority: "high",
      employees: [
        {
          id: "emp-001",
          name: "김철수",
          department: "인사팀",
          position: "사원",
          status: "계약서 서명 대기",
          hireDate: "2025-09-01",
          priority: "high",
          nextAction: "계약서 확인",
          dueDate: "2025-08-30"
        },
        {
          id: "emp-002",
          name: "이영희",
          department: "개발팀",
          position: "주임",
          status: "필수 서류 제출 대기",
          hireDate: "2025-09-05",
          priority: "medium",
          nextAction: "주민등록등본 제출",
          dueDate: "2025-09-02"
        },
        {
          id: "emp-003",
          name: "박민수",
          department: "마케팅팀",
          position: "사원",
          status: "입사 오리엔테이션 준비",
          hireDate: "2025-09-07",
          priority: "low",
          nextAction: "오리엔테이션 참석",
          dueDate: "2025-09-06"
        }
      ]
    },
    {
      id: "onboarding",
      title: "입사 온보딩",
      description: "입사 후 초기 온보딩 절차",
      count: 1, // 실제 employees는 2명 → mismatch
      priority: "medium",
      employees: [
        {
          id: "emp-004",
          name: "정수빈",
          department: "디자인팀",
          position: "사원",
          status: "교육 수강 중",
          hireDate: "2025-08-20",
          priority: "medium",
          nextAction: "교육 완료 후 평가",
          dueDate: "2025-09-10"
        },
        {
          id: "emp-005",
          name: "최지훈",
          department: "영업팀",
          position: "대리",
          status: "멘토 배정 대기",
          hireDate: "2025-08-25",
          priority: "high",
          nextAction: "멘토와 첫 미팅",
          dueDate: "2025-09-01"
        }
      ]
    },
    {
      id: "active",
      title: "재직 중",
      description: "현재 근무 중인 직원 현황",
      count: 10, // 실제 employees는 2명 → mismatch
      priority: "low",
      employees: [
        {
          id: "emp-006",
          name: "한지민",
          department: "재무팀",
          position: "과장",
          status: "재직 중",
          hireDate: "2022-03-01",
          priority: "low",
          nextAction: "연말 정산 준비",
          dueDate: "2025-12-15"
        },
        {
          id: "emp-007",
          name: "오세훈",
          department: "개발팀",
          position: "팀장",
          status: "재직 중",
          hireDate: "2021-07-10",
          priority: "medium",
          nextAction: "프로젝트 일정 관리",
          dueDate: "2025-09-15"
        }
      ]
    }
  ]
};
