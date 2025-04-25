from typing import Dict, List, Optional
import uuid
from app.models import Task, TaskStatus, TenantNode

tasks: Dict[str, Task] = {}

tenant_hierarchy = TenantNode(
    id="root",
    name="总公司",
    children=[
        TenantNode(
            id="dept1",
            name="电商部门1",
            children=[
                TenantNode(id="team1", name="团队1", children=[]),
                TenantNode(id="team2", name="团队2", children=[]),
            ],
        ),
        TenantNode(
            id="dept2",
            name="电商部门2",
            children=[
                TenantNode(id="team3", name="团队3", children=[]),
                TenantNode(id="team4", name="团队4", children=[]),
            ],
        ),
    ],
)

script_types = ["SQL", "Python", "Shell"]

def init_sample_data():
    sample_tasks = [
        Task(
            id="TASK001",
            name="数据核对任务1",
            owner="张三",
            unique_name="daily_check_001",
            status=TaskStatus.DRAFT,
            tenant="团队1",
            tenant_path=["总公司", "电商部门1", "团队1"],
            rule_id="RULE001",
            rule_unique_name="rule_daily_001",
            script_type="SQL",
            details={"description": "每日数据核对", "created_at": "2025-04-20"},
        ),
        Task(
            id="TASK002",
            name="数据核对任务2",
            owner="李四",
            unique_name="weekly_check_001",
            status=TaskStatus.ANALYZING,
            tenant="团队2",
            tenant_path=["总公司", "电商部门1", "团队2"],
            rule_id="RULE002",
            rule_unique_name="rule_weekly_001",
            script_type="Python",
            details={"description": "每周数据核对", "created_at": "2025-04-21"},
        ),
        Task(
            id="TASK003",
            name="数据核对任务3",
            owner="王五",
            unique_name="monthly_check_001",
            status=TaskStatus.COMPLETED,
            tenant="团队3",
            tenant_path=["总公司", "电商部门2", "团队3"],
            rule_id="RULE003",
            rule_unique_name="rule_monthly_001",
            script_type="Shell",
            details={"description": "每月数据核对", "created_at": "2025-04-22"},
        ),
        Task(
            id="TASK004",
            name="数据核对任务4",
            owner="赵六",
            unique_name="quarterly_check_001",
            status=TaskStatus.ERROR,
            tenant="团队4",
            tenant_path=["总公司", "电商部门2", "团队4"],
            rule_id="RULE004",
            rule_unique_name="rule_quarterly_001",
            script_type="SQL",
            details={"description": "季度数据核对", "created_at": "2025-04-23"},
        ),
    ]
    
    for task in sample_tasks:
        tasks[task.id] = task

init_sample_data()

def get_tasks(
    status: Optional[TaskStatus] = None,
    tenant: Optional[str] = None,
    owner: Optional[str] = None,
    task_id: Optional[str] = None,
    unique_name: Optional[str] = None,
    rule_id: Optional[str] = None,
    rule_unique_name: Optional[str] = None,
    script_type: Optional[str] = None,
) -> List[Task]:
    filtered_tasks = list(tasks.values())
    
    if status:
        filtered_tasks = [t for t in filtered_tasks if t.status == status]
    if tenant:
        filtered_tasks = [t for t in filtered_tasks if tenant in t.tenant_path]
    if owner:
        filtered_tasks = [t for t in filtered_tasks if owner.lower() in t.owner.lower()]
    if task_id:
        filtered_tasks = [t for t in filtered_tasks if task_id.lower() in t.id.lower()]
    if unique_name:
        filtered_tasks = [t for t in filtered_tasks if unique_name.lower() in t.unique_name.lower()]
    if rule_id:
        filtered_tasks = [t for t in filtered_tasks if t.rule_id and rule_id.lower() in t.rule_id.lower()]
    if rule_unique_name:
        filtered_tasks = [t for t in filtered_tasks if t.rule_unique_name and rule_unique_name.lower() in t.rule_unique_name.lower()]
    if script_type:
        filtered_tasks = [t for t in filtered_tasks if t.script_type and script_type == t.script_type]
    
    return filtered_tasks

def get_task(task_id: str) -> Optional[Task]:
    return tasks.get(task_id)

def create_task(task_data: dict) -> Task:
    task_id = f"TASK{str(uuid.uuid4())[:8].upper()}"
    task = Task(id=task_id, **task_data)
    tasks[task_id] = task
    return task

def update_task(task_id: str, task_data: dict) -> Optional[Task]:
    if task_id not in tasks:
        return None
    
    current_task = tasks[task_id]
    updated_data = current_task.dict()
    
    for key, value in task_data.items():
        if value is not None:
            updated_data[key] = value
    
    updated_task = Task(**updated_data)
    tasks[task_id] = updated_task
    return updated_task

def analyze_task(task_id: str) -> Optional[Task]:
    if task_id not in tasks:
        return None
    
    task = tasks[task_id]
    
    if task.status == TaskStatus.DRAFT:
        task.status = TaskStatus.ANALYZING
    elif task.status == TaskStatus.ANALYZING:
        task.status = TaskStatus.COMPLETED
    
    tasks[task_id] = task
    return task

def get_tenant_hierarchy() -> TenantNode:
    return tenant_hierarchy

def get_script_types() -> List[str]:
    return script_types
