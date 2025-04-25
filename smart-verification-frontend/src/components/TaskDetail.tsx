import { Task } from "../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { ScrollArea } from "../components/ui/scroll-area";
import { Badge } from "../components/ui/badge";

interface TaskDetailProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetail = ({ task, isOpen, onClose }: TaskDetailProps) => {
  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-screen">
        <DialogHeader>
          <DialogTitle>任务详情</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">任务ID</h3>
              <p className="mt-1 text-sm">{task.id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">任务名称</h3>
              <p className="mt-1 text-sm">{task.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">任务Owner</h3>
              <p className="mt-1 text-sm">{task.owner}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">任务唯一名称</h3>
              <p className="mt-1 text-sm">{task.unique_name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">状态</h3>
              <Badge 
                className={`mt-1 ${
                  task.status === "草稿" ? "bg-gray-200 text-gray-800" :
                  task.status === "分析中" ? "bg-blue-200 text-blue-800" :
                  task.status === "完成" ? "bg-green-200 text-green-800" :
                  "bg-red-200 text-red-800"
                }`}
              >
                {task.status}
              </Badge>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">租户</h3>
              <p className="mt-1 text-sm">{task.tenant}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">租户路径</h3>
              <p className="mt-1 text-sm">{task.tenant_path.join(" > ")}</p>
            </div>
            
            {task.rule_id && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">规则ID</h3>
                <p className="mt-1 text-sm">{task.rule_id}</p>
              </div>
            )}
            
            {task.rule_unique_name && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">规则唯一名称</h3>
                <p className="mt-1 text-sm">{task.rule_unique_name}</p>
              </div>
            )}
            
            {task.script_type && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">脚本类型</h3>
                <p className="mt-1 text-sm">{task.script_type}</p>
              </div>
            )}
            
            {task.details && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">详细信息</h3>
                <pre className="mt-1 text-sm bg-gray-50 p-2 rounded overflow-auto">
                  {JSON.stringify(task.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetail;
