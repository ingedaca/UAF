import React, { useState } from 'react';
import { AssetTree } from '../components/AssetTree';
import { MOCK_HIERARCHY } from '../constants';
import { AssetNode, NodeType } from '../types';
import { Save, Plus, Trash2, Code, Database, Info } from 'lucide-react';

export const InformationModel: React.FC = () => {
  const [hierarchy, setHierarchy] = useState<AssetNode[]>(MOCK_HIERARCHY);
  const [selectedNode, setSelectedNode] = useState<AssetNode | null>(null);
  const [editingNode, setEditingNode] = useState<AssetNode | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'attributes'>('attributes');
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeType, setNewNodeType] = useState<NodeType>(NodeType.Asset);

  // Simple state for the form (not fully functional in demo)
  const [unsPath, setUnsPath] = useState('');

  const handleNodeSelect = (node: AssetNode) => {
    setSelectedNode(node);
    setEditingNode(JSON.parse(JSON.stringify(node))); // Deep copy for editing
    setUnsPath(node.unsPath || '');
  };

  const findAndAddNode = (nodes: AssetNode[], parentId: string, newNode: AssetNode): AssetNode[] => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newNode]
        };
      }
      if (node.children) {
        return {
          ...node,
          children: findAndAddNode(node.children, parentId, newNode)
        };
      }
      return node;
    });
  };

  const handleAddNode = () => {
    if (!newNodeName.trim()) return;

    const newNode: AssetNode = {
      id: `${newNodeType.toLowerCase()}-${Date.now()}`,
      name: newNodeName,
      type: newNodeType,
      children: [],
      attributes: []
    };

    if (selectedNode) {
      setHierarchy(prev => findAndAddNode(prev, selectedNode.id, newNode));
    } else {
      setHierarchy(prev => [...prev, newNode]);
    }

    setNewNodeName('');
    setIsAddingNode(false);
  };

  const updateNodeInHierarchy = (nodes: AssetNode[], updatedNode: AssetNode): AssetNode[] => {
    return nodes.map(node => {
      if (node.id === updatedNode.id) {
        return { ...updatedNode };
      }
      if (node.children) {
        return {
          ...node,
          children: updateNodeInHierarchy(node.children, updatedNode)
        };
      }
      return node;
    });
  };

  const handleSaveChanges = () => {
    if (!editingNode) return;

    const finalNode = {
      ...editingNode,
      unsPath: unsPath
    };

    setHierarchy(prev => updateNodeInHierarchy(prev, finalNode));
    setSelectedNode(finalNode);
    setEditingNode(JSON.parse(JSON.stringify(finalNode)));
    alert('Changes saved successfully!');
  };

  const handleAttributeChange = (id: string, field: string, value: any) => {
    if (!editingNode) return;
    setEditingNode({
      ...editingNode,
      attributes: editingNode.attributes?.map(attr =>
        attr.id === id ? { ...attr, [field]: value } : attr
      )
    });
  };

  const handleAddAttribute = () => {
    if (!editingNode) return;
    const newAttr = {
      id: `attr-${Date.now()}`,
      name: 'New Attribute',
      dataType: 'Float'
    };
    setEditingNode({
      ...editingNode,
      attributes: [...(editingNode.attributes || []), newAttr]
    });
  };

  const handleDeleteAttribute = (id: string) => {
    if (!editingNode) return;
    setEditingNode({
      ...editingNode,
      attributes: editingNode.attributes?.filter(attr => attr.id !== id)
    });
  };

  return (
    <div className="flex h-full">
      {/* Left Pane: Hierarchy */}
      <div className="w-80 bg-slate-850 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800 bg-slate-850">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-slate-200">Asset Hierarchy</h3>
            <button
              onClick={() => setIsAddingNode(true)}
              className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <AssetTree nodes={hierarchy} onSelect={handleNodeSelect} selectedId={selectedNode?.id} />
        </div>
      </div>

      {/* Right Pane: Details */}
      <div className="flex-1 overflow-y-auto bg-slate-900">
        {selectedNode ? (
          <div className="max-w-4xl mx-auto p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-900/30 px-2 py-0.5 rounded border border-indigo-500/30">
                    {selectedNode.type.toUpperCase()}
                  </span>
                  {selectedNode.dataSource && (
                    <span className="text-xs font-mono text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                      <Database size={10} /> {selectedNode.dataSource}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-bold text-white">{selectedNode.name}</h2>
                <p className="text-slate-400 font-mono text-sm mt-2">{selectedNode.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveChanges}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800 mb-6">
              <button
                onClick={() => setActiveTab('attributes')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'attributes' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
              >
                Attributes & Mapping
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
              >
                Configuration
              </button>
            </div>

            {activeTab === 'attributes' && (
              <div className="space-y-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
                    <h3 className="font-semibold text-slate-200">Defined Attributes</h3>
                    <button
                      onClick={handleAddAttribute}
                      className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-300 transition-colors"
                    >
                      + Add Attribute
                    </button>
                  </div>

                  {!editingNode?.attributes || editingNode.attributes.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                      No attributes defined for this asset.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-700">
                      {editingNode.attributes.map(attr => (
                        <div key={attr.id} className="p-4 hover:bg-slate-800/80 transition-colors group">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              <input
                                type="text"
                                value={attr.name}
                                onChange={(e) => handleAttributeChange(attr.id, 'name', e.target.value)}
                                className="bg-transparent border-b border-transparent hover:border-slate-600 focus:border-indigo-500 focus:outline-none font-medium text-slate-200 px-1 py-0.5"
                              />
                              <select
                                value={attr.dataType}
                                onChange={(e) => handleAttributeChange(attr.id, 'dataType', e.target.value)}
                                className="text-xs bg-slate-700 px-1.5 py-0.5 rounded text-slate-400 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              >
                                <option>Float</option>
                                <option>Integer</option>
                                <option>Boolean</option>
                                <option>String</option>
                              </select>
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={attr.isKpi}
                                  onChange={(e) => handleAttributeChange(attr.id, 'isKpi', e.target.checked)}
                                  className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-xs text-slate-400">KPI</span>
                              </label>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                              <button
                                onClick={() => handleDeleteAttribute(attr.id)}
                                className="text-slate-400 hover:text-rose-400"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Source Tag</label>
                              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded px-2 py-1.5">
                                <Database size={12} className="text-amber-500" />
                                <input
                                  type="text"
                                  value={attr.sourceTag || ''}
                                  onChange={(e) => handleAttributeChange(attr.id, 'sourceTag', e.target.value)}
                                  placeholder="e.g. PLC.DB10.Temp"
                                  className="bg-transparent border-none focus:outline-none text-xs font-mono text-slate-300 w-full"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-slate-500 mb-1">Transformation Logic</label>
                              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded px-2 py-1.5">
                                <Code size={12} className="text-emerald-500" />
                                <input
                                  type="text"
                                  value={attr.transformation || ''}
                                  onChange={(e) => handleAttributeChange(attr.id, 'transformation', e.target.value)}
                                  placeholder="return val * 1.0;"
                                  className="bg-transparent border-none focus:outline-none text-xs font-mono text-emerald-400 w-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Unified Namespace Path</label>
                    <input
                      type="text"
                      value={unsPath}
                      onChange={(e) => setUnsPath(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-sm"
                    />
                    <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                      <Info size={12} /> The MQTT topic where this asset publishes real-time data.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Historical Data Provider</label>
                    <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-indigo-500">
                      <option>OSIsoft PI System</option>
                      <option>SQL Server (Legacy)</option>
                      <option>InfluxDB v2</option>
                      <option>Azure Data Explorer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                    <textarea
                      rows={3}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                      placeholder="Enter operational context describing this asset..."
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <Database size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">Select an asset from the hierarchy</p>
            <p className="text-sm opacity-60">View and edit information model definitions</p>
          </div>
        )}
      </div>
      {/* Add Node Modal */}
      {isAddingNode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-850 border border-slate-700 rounded-xl p-6 w-96 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Add New {selectedNode ? `under ${selectedNode.name}` : 'Root Asset'}</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                <input
                  type="text"
                  value={newNodeName}
                  onChange={(e) => setNewNodeName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Pump_003"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Type</label>
                <select
                  value={newNodeType}
                  onChange={(e) => setNewNodeType(e.target.value as NodeType)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  {Object.values(NodeType).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsAddingNode(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNode}
                disabled={!newNodeName.trim()}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-out text-white rounded-lg font-medium transition-colors"
              >
                Create Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};