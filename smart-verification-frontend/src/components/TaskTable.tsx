import { useState } from "react";
import { Task, TaskStatus } from "../types";
import { analyzeTask } from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Eye, Edit, Play } from "lucide-react";
import { Badge } from "../components/ui/badge";

interface TaskTableProps {
  tasks: Task[];
  onViewTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onTasksRefresh: () => void;
}

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.DRAFT:
      return "bg-gray-200 text-gray-800";
    case TaskStatus.ANALYZING:
      return "bg-blue-200 text-blue-800";
    case TaskStatus.COMPLETED:
      return "bg-green-200 text-green-800";
    case TaskStatus.ERROR:
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const TaskTable = ({ tasks, onViewTask, onEditTask, onTasksRefresh }: TaskTableProps) => {
  const [analyzingTaskIds, setAnalyzingTaskIds] = useState<Set<string>>(new Set());

  const handleAnalyze = async (taskId: string) => {
    try {
      setAnalyzingTaskIds(prev => new Set(prev).add(taskId));
      await analyzeTask(taskId);
      onTasksRefresh();
    } catch (error) {
      console.error("Failed to analyze task:", error);
    } finally {
      setAnalyzingTaskIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>任务ID</TableHead>
            <TableHead>任务名称</TableHead>
            <TableHead>任务Owner</TableHead>
            <TableHead>任务唯一名称</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>租户</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.owner}</TableCell>
                <TableCell>{task.unique_name}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>{task.tenant}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewTask(task)}
                    className="inline-flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    查看
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditTask(task)}
                    className="inline-flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    编辑
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAnalyze(task.id)}
                    disabled={analyzingTaskIds.has(task.id)}
                    className="inline-flex items-center"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    分析
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;
