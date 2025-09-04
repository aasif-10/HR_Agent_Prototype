// lib/hr-data.js
// This file contains all our HR data - think of it as a mini database

// Employee Records - In real life, this comes from your HR system
export const employees = {
  "john.doe": {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@company.com",
    department: "Engineering",
    role: "Senior Developer",
    joinDate: "2022-01-15",
    leaveBalance: 25, // Days remaining this year
    totalLeave: 30, // Annual entitlement
    manager: "jane.smith",
    assets: ["Laptop-DEV-001", "Monitor-DEV-001"],
    salary: 95000,
  },
  "jane.smith": {
    id: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    department: "HR",
    role: "HR Manager",
    joinDate: "2020-03-10",
    leaveBalance: 28,
    totalLeave: 30,
    manager: null, // She's the boss!
    assets: ["Laptop-HR-001"],
    salary: 85000,
  },
};

// Leave Requests Storage - Tracks all leave applications
export let leaveRequests = [
  {
    id: "LR001",
    employeeId: "john.doe",
    startDate: "2024-02-15",
    endDate: "2024-02-16",
    days: 2,
    type: "annual",
    reason: "Personal work",
    status: "approved",
    appliedDate: "2024-02-01",
    approvedBy: "jane.smith",
  },
];

// Asset Requests Storage - Tracks laptop/equipment requests
export let assetRequests = [
  {
    id: "AR001",
    employeeId: "john.doe",
    assetType: "laptop",
    model: "MacBook Pro M3",
    status: "delivered",
    requestDate: "2024-01-15",
    deliveryDate: "2024-01-18",
  },
];

// Company Policies - The knowledge base
export const policies = [
  {
    id: "POL001",
    title: "Annual Leave Policy",
    category: "leave",
    content: `
**Annual Leave Entitlement:**
- All full-time employees: 30 days per year
- Part-time employees: Pro-rated based on working hours
- Leave year runs from January 1st to December 31st

**Application Process:**
- Apply at least 7 days in advance
- Manager approval required for leave > 5 days
- Leave < 3 days can be auto-approved

**Carryover Policy:**
- Maximum 5 days can be carried to next year
- Unused leave expires on March 31st of following year
    `,
    keywords: ["annual", "vacation", "holiday", "time off", "pto"],
  },
  {
    id: "POL002",
    title: "Sick Leave Policy",
    category: "leave",
    content: `
**Sick Leave Entitlement:**
- All employees: 12 days per year
- No carryover allowed
- Medical certificate required for >3 consecutive days

**Reporting:**
- Notify manager before 9 AM on first day
- Update on recovery timeline daily
- Submit medical certificate within 7 days
    `,
    keywords: ["sick", "medical", "illness", "health", "doctor"],
  },
  {
    id: "POL003",
    title: "Maternity Leave Policy",
    category: "leave",
    content: `
**Maternity Leave Entitlement:**
- 18 weeks paid maternity leave
- Additional 6 months unpaid leave available
- Partner leave: 2 weeks paid

**Application:**
- Notify HR at least 8 weeks before due date
- Provide medical certificate confirming pregnancy
- Discuss return-to-work plans
    `,
    keywords: ["maternity", "pregnancy", "baby", "mother", "birth"],
  },
  {
    id: "POL004",
    title: "Work From Home Policy",
    category: "remote",
    content: `
**WFH Eligibility:**
- Available to all permanent employees after 6 months
- Maximum 2 days per week for regular WFH
- Full remote work requires special approval

**Requirements:**
- Reliable internet connection (minimum 25 Mbps)
- Dedicated workspace
- Available during core hours (9 AM - 3 PM)
- Regular check-ins with manager
    `,
    keywords: ["wfh", "remote", "home", "flexible", "hybrid"],
  },
];

// Helper Functions
export function getEmployee(emailOrId) {
  // Find employee by email or ID
  return Object.values(employees).find(
    (emp) => emp.email === emailOrId || emp.id === emailOrId
  );
}

export function addLeaveRequest(request) {
  const id = "LR" + String(Date.now()).slice(-6);
  const newRequest = { id, ...request };
  leaveRequests.push(newRequest);
  return newRequest;
}

export function addAssetRequest(request) {
  const id = "AR" + String(Date.now()).slice(-6);
  const newRequest = { id, ...request };
  assetRequests.push(newRequest);
  return newRequest;
}

export function searchPolicies(query) {
  const searchTerm = query.toLowerCase();
  return policies.filter(
    (policy) =>
      policy.keywords.some((keyword) => searchTerm.includes(keyword)) ||
      policy.title.toLowerCase().includes(searchTerm) ||
      policy.content.toLowerCase().includes(searchTerm)
  );
}
