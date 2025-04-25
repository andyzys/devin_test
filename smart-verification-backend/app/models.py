from enum import Enum
from typing import List, Optional
from pydantic import BaseModel


class TaskStatus(str, Enum):
    DRAFT = "草稿"
    ANALYZING = "分析中"
    COMPLETED = "完成"
    ERROR = "运行出错"


class TenantNode(BaseModel):
    id: str
    name: str
    children: Optional[List['TenantNode']] = None


class Task(BaseModel):
    id: str
    name: str
    owner: str
    unique_name: str
    status: TaskStatus
    tenant: str
    tenant_path: List[str]
    rule_id: Optional[str] = None
    rule_unique_name: Optional[str] = None
    script_type: Optional[str] = None
    details: Optional[dict] = None


class TaskCreate(BaseModel):
    name: str
    owner: str
    unique_name: str
    status: TaskStatus
    tenant: str
    tenant_path: List[str]
    rule_id: Optional[str] = None
    rule_unique_name: Optional[str] = None
    script_type: Optional[str] = None
    details: Optional[dict] = None


class TaskUpdate(BaseModel):
    name: Optional[str] = None
    owner: Optional[str] = None
    unique_name: Optional[str] = None
    status: Optional[TaskStatus] = None
    tenant: Optional[str] = None
    tenant_path: Optional[List[str]] = None
    rule_id: Optional[str] = None
    rule_unique_name: Optional[str] = None
    script_type: Optional[str] = None
    details: Optional[dict] = None
