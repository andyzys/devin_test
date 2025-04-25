import { useState, useEffect } from "react";
import { TenantNode } from "../types";
import { fetchTenantHierarchy, fetchStatusOptions, fetchScriptTypes } from "../api";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";

interface FilterSectionProps {
  onFilterChange: (filters: any) => void;
}

const FilterSection = ({ onFilterChange }: FilterSectionProps) => {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [tenant, setTenant] = useState<string | undefined>(undefined);
  const [owner, setOwner] = useState<string | undefined>(undefined);
  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [uniqueName, setUniqueName] = useState<string | undefined>(undefined);
  const [ruleId, setRuleId] = useState<string | undefined>(undefined);
  const [ruleUniqueName, setRuleUniqueName] = useState<string | undefined>(undefined);
  const [scriptType, setScriptType] = useState<string | undefined>(undefined);
  
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [tenantHierarchy, setTenantHierarchy] = useState<TenantNode | undefined>(undefined);
  const [scriptTypes, setScriptTypes] = useState<string[]>([]);
  const [selectedTenantPath, setSelectedTenantPath] = useState<string[]>([]);
  const [tenantOptions, setTenantOptions] = useState<TenantNode[][]>([]);
  
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [statusOpts, tenantHierarchyData, scriptTypesData] = await Promise.all([
          fetchStatusOptions(),
          fetchTenantHierarchy(),
          fetchScriptTypes()
        ]);
        
        setStatusOptions(statusOpts);
        setTenantHierarchy(tenantHierarchyData);
        setScriptTypes(scriptTypesData);
        
        if (tenantHierarchyData) {
          setTenantOptions([[tenantHierarchyData]]);
        }
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      }
    };
    
    fetchFilterOptions();
  }, []);
  
  const handleTenantSelect = (level: number, nodeId: string) => {
    const newPath = [...selectedTenantPath.slice(0, level), nodeId];
    setSelectedTenantPath(newPath);
    
    let currentNode: TenantNode | undefined = tenantHierarchy;
    for (let i = 0; i < newPath.length; i++) {
      const id = newPath[i];
      currentNode = currentNode?.children?.find(node => node.id === id);
      if (!currentNode) break;
    }
    
    if (currentNode && currentNode.children && currentNode.children.length > 0) {
      const nextLevelOptions = [...tenantOptions];
      nextLevelOptions[level + 1] = currentNode.children;
      setTenantOptions(nextLevelOptions.slice(0, level + 2));
    } else {
      setTenantOptions(tenantOptions.slice(0, level + 1));
    }
    
    if (currentNode) {
      setTenant(currentNode.name);
    }
  };
  
  const handleSearch = () => {
    onFilterChange({
      status: status === "all" ? undefined : status,
      tenant,
      owner,
      task_id: taskId,
      unique_name: uniqueName,
      rule_id: ruleId,
      rule_unique_name: ruleUniqueName,
      script_type: scriptType === "all" ? undefined : scriptType
    });
  };
  
  return (
    <div className="bg-white p-4 rounded-md shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">租户</label>
          <div className="flex space-x-2">
            {tenantOptions.map((nodes, level) => (
              <Select
                key={level}
                value={selectedTenantPath[level]}
                onValueChange={(value) => handleTenantSelect(level, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`选择${level === 0 ? '组织' : '子组织'}`} />
                </SelectTrigger>
                <SelectContent>
                  {nodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>
                      {node.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">任务Owner</label>
          <Input
            placeholder="输入任务Owner"
            value={owner || ""}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">任务ID</label>
          <Input
            placeholder="输入任务ID"
            value={taskId || ""}
            onChange={(e) => setTaskId(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">任务唯一名称</label>
          <Input
            placeholder="输入任务唯一名称"
            value={uniqueName || ""}
            onChange={(e) => setUniqueName(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">规则ID</label>
          <Input
            placeholder="输入规则ID"
            value={ruleId || ""}
            onChange={(e) => setRuleId(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">规则唯一名称</label>
          <Input
            placeholder="输入规则唯一名称"
            value={ruleUniqueName || ""}
            onChange={(e) => setRuleUniqueName(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">脚本类型</label>
          <Select
            value={scriptType}
            onValueChange={(value) => setScriptType(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择脚本类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              {scriptTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSearch} className="flex items-center gap-2">
          <Search size={16} />
          搜索
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
