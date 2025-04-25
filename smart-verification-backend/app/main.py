from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import psycopg

from app.models import Task, TaskCreate, TaskUpdate, TaskStatus, TenantNode
from app.db import (
    get_tasks, get_task, create_task, update_task, analyze_task,
    get_tenant_hierarchy, get_script_types
)

app = FastAPI()

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/api/tasks", response_model=List[Task])
async def list_tasks(
    status: Optional[TaskStatus] = None,
    tenant: Optional[str] = None,
    owner: Optional[str] = None,
    task_id: Optional[str] = None,
    unique_name: Optional[str] = None,
    rule_id: Optional[str] = None,
    rule_unique_name: Optional[str] = None,
    script_type: Optional[str] = None,
):
    return get_tasks(
        status=status,
        tenant=tenant,
        owner=owner,
        task_id=task_id,
        unique_name=unique_name,
        rule_id=rule_id,
        rule_unique_name=rule_unique_name,
        script_type=script_type,
    )

@app.get("/api/tasks/{task_id}", response_model=Task)
async def get_task_by_id(task_id: str):
    task = get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.post("/api/tasks", response_model=Task)
async def create_new_task(task: TaskCreate):
    return create_task(task.dict())

@app.put("/api/tasks/{task_id}", response_model=Task)
async def update_task_by_id(task_id: str, task_update: TaskUpdate):
    updated_task = update_task(task_id, task_update.dict(exclude_unset=True))
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@app.post("/api/tasks/{task_id}/analyze", response_model=Task)
async def analyze_task_by_id(task_id: str):
    updated_task = analyze_task(task_id)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@app.get("/api/tenants", response_model=TenantNode)
async def get_tenants():
    return get_tenant_hierarchy()

@app.get("/api/script-types", response_model=List[str])
async def get_available_script_types():
    return get_script_types()

@app.get("/api/status-options", response_model=List[str])
async def get_status_options():
    return [status.value for status in TaskStatus]
