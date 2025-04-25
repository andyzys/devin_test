import { Task, TaskStatus, TenantNode } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const fetchTasks = async (filters: {
  status?: TaskStatus;
  tenant?: string;
  owner?: string;
  task_id?: string;
  unique_name?: string;
  rule_id?: string;
  rule_unique_name?: string;
  script_type?: string;
}): Promise<Task[]> => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });
  
  const response = await fetch(`${API_URL}/api/tasks?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  
  return response.json();
};

export const fetchTaskById = async (taskId: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }
  
  return response.json();
};

export const updateTask = async (taskId: string, data: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  
  return response.json();
};

export const analyzeTask = async (taskId: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/tasks/${taskId}/analyze`, {
    method: "POST",
  });
  
  if (!response.ok) {
    throw new Error("Failed to analyze task");
  }
  
  return response.json();
};

export const fetchTenantHierarchy = async (): Promise<TenantNode> => {
  const response = await fetch(`${API_URL}/api/tenants`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch tenant hierarchy");
  }
  
  return response.json();
};

export const fetchScriptTypes = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/api/script-types`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch script types");
  }
  
  return response.json();
};

export const fetchStatusOptions = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/api/status-options`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch status options");
  }
  
  return response.json();
};
