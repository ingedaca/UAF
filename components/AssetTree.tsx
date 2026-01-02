import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, Box, Server, Factory, Activity } from 'lucide-react';
import { AssetNode, NodeType } from '../types';

interface AssetTreeProps {
  nodes: AssetNode[];
  onSelect: (node: AssetNode) => void;
  selectedId?: string;
  level?: number;
}

const getNodeIcon = (type: NodeType) => {
  switch (type) {
    case NodeType.Enterprise: return <Activity size={16} className="text-blue-400" />;
    case NodeType.Site: return <Factory size={16} className="text-emerald-400" />;
    case NodeType.Area: return <Box size={16} className="text-amber-400" />;
    case NodeType.Line: return <Server size={16} className="text-purple-400" />;
    case NodeType.Asset: return <Activity size={16} className="text-rose-400" />;
    default: return <Folder size={16} />;
  }
};

const AssetTreeNode: React.FC<{ node: AssetNode; onSelect: (n: AssetNode) => void; selectedId?: string; level: number }> = ({
  node,
  onSelect,
  selectedId,
  level
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  return (
    <div>
      <div 
        className={`flex items-center py-1.5 px-2 cursor-pointer transition-colors select-none ${
          isSelected ? 'bg-indigo-600/30 text-indigo-200 border-l-2 border-indigo-500' : 'hover:bg-slate-800 text-slate-400'
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(node)}
      >
        <span 
          className="mr-1 p-0.5 rounded hover:bg-slate-700"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {hasChildren ? (
            isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <span className="w-[14px] inline-block" />
          )}
        </span>
        <span className="mr-2 opacity-80">{getNodeIcon(node.type)}</span>
        <span className={`text-sm ${isSelected ? 'font-medium text-white' : ''}`}>
          {node.name}
        </span>
      </div>
      
      {isOpen && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <AssetTreeNode 
              key={child.id} 
              node={child} 
              onSelect={onSelect} 
              selectedId={selectedId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const AssetTree: React.FC<AssetTreeProps> = ({ nodes, onSelect, selectedId, level = 0 }) => {
  return (
    <div className="flex flex-col">
      {nodes.map((node) => (
        <AssetTreeNode 
          key={node.id} 
          node={node} 
          onSelect={onSelect} 
          selectedId={selectedId}
          level={level}
        />
      ))}
    </div>
  );
};