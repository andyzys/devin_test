export enum TaskStatus {
  DRAFT = "草稿",
  ANALYZING = "分析中",
  COMPLETED = "完成",
  ERROR = "运行出错"
}

export interface TenantNode {
  id: string;
  name: string;
  children?: TenantNode[];
}

export interface Task {
  id: string;
  name: string;
  owner: string;
  unique_name: string;
  status: TaskStatus;
  tenant: string;
  tenant_path: string[];
  rule_id?: string;
  rule_unique_name?: string;
  script_type?: string;
  details?: Record<string, any>;
}
