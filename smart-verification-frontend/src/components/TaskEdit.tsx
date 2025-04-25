import { useState, useEffect } from "react";
import { Task, TaskStatus } from "../types";
import { updateTask } from "../api";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { Loader2 } from "lucide-react";

interface TaskEditProps {
  task: Task | null;
  onClose: () => void;
  onTaskUpdated: () => void;
}

const TaskEdit = ({ task, onClose, onTaskUpdated }: TaskEditProps) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  if (!editedTask) return null;

  const handleInputChange = (field: keyof Task, value: string) => {
    setEditedTask(prev => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  };

  const handleStatusChange = (value: string) => {
    setEditedTask(prev => {
      if (!prev) return prev;
      return { ...prev, status: value as TaskStatus };
    });
  };

  const handleSubmit = async () => {
    if (!editedTask) return;
    
    try {
      setIsSubmitting(true);
      await updateTask(editedTask.id, editedTask);
      toast({
        title: "更新成功",
        description: "任务信息已成功更新",
      });
      onTaskUpdated();
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
      toast({
        title: "更新失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">任务ID</label>
          <Input
            value={editedTask.id}
            onChange={(e) => handleInputChange("id", e.target.value)}
            disabled
            className="bg-gray-100"
          />
          <p className="text-xs text-gray-500 mt-1">任务ID不可编辑</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">任务名称</label>
          <Input
            value={editedTask.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">任务Owner</label>
          <Input
            value={editedTask.owner}
            onChange={(e) => handleInputChange("owner", e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">任务唯一名称</label>
          <Input
            value={editedTask.unique_name}
            onChange={(e) => handleInputChange("unique_name", e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
          <Select
            value={editedTask.status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TaskStatus.DRAFT}>{TaskStatus.DRAFT}</SelectItem>
              <SelectItem value={TaskStatus.ANALYZING}>{TaskStatus.ANALYZING}</SelectItem>
              <SelectItem value={TaskStatus.COMPLETED}>{TaskStatus.COMPLETED}</SelectItem>
              <SelectItem value={TaskStatus.ERROR}>{TaskStatus.ERROR}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">租户</label>
          <Input
            value={editedTask.tenant}
            onChange={(e) => handleInputChange("tenant", e.target.value)}
          />
        </div>
        
        {editedTask.rule_id !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">规则ID</label>
            <Input
              value={editedTask.rule_id || ""}
              onChange={(e) => handleInputChange("rule_id", e.target.value)}
            />
          </div>
        )}
        
        {editedTask.rule_unique_name !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">规则唯一名称</label>
            <Input
              value={editedTask.rule_unique_name || ""}
              onChange={(e) => handleInputChange("rule_unique_name", e.target.value)}
            />
          </div>
        )}
        
        {editedTask.script_type !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">脚本类型</label>
            <Input
              value={editedTask.script_type || ""}
              onChange={(e) => handleInputChange("script_type", e.target.value)}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
          取消
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            "保存"
          )}
        </Button>
      </div>
    </div>
  );
};

export default TaskEdit;
