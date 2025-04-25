import { useState, useEffect } from 'react';
import { Task } from './types';
import { fetchTasks } from './api';
import FilterSection from './components/FilterSection';
import TaskTable from './components/TaskTable';
import TaskDetail from './components/TaskDetail';
import TaskEdit from './components/TaskEdit';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './components/ui/drawer';
import { Toaster } from './components/ui/toaster';
import { useToast } from './hooks/use-toast';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>({});
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  
  const { toast } = useToast();

  const fetchTasksData = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks(filters);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast({
        title: "获取任务失败",
        description: "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setDetailOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleTasksRefresh = () => {
    fetchTasksData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">智能核对页面</h1>
        
        <FilterSection onFilterChange={handleFilterChange} />
        
        {loading ? (
          <div className="bg-white p-12 rounded-md shadow flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <TaskTable 
            tasks={tasks} 
            onViewTask={handleViewTask} 
            onEditTask={handleEditTask} 
            onTasksRefresh={handleTasksRefresh} 
          />
        )}
        
        <TaskDetail 
          task={selectedTask} 
          isOpen={detailOpen} 
          onClose={() => setDetailOpen(false)} 
        />
        
        <Drawer open={editOpen} onOpenChange={setEditOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>编辑任务</DrawerTitle>
            </DrawerHeader>
            <TaskEdit 
              task={selectedTask} 
              onClose={() => setEditOpen(false)} 
              onTaskUpdated={handleTasksRefresh} 
            />
          </DrawerContent>
        </Drawer>
      </div>
      
      <Toaster />
    </div>
  );
}

export default App;
