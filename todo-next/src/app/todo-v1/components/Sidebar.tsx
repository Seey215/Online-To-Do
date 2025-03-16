// src/app/todo-v1/components/Sidebar.tsx
import React from 'react';
import { Button } from 'antd';
import {
    ScheduleOutlined,
    StarOutlined,
    AppstoreOutlined,
    UnorderedListOutlined,
    MenuOutlined,
    PlusOutlined,
    EllipsisOutlined,
} from '@ant-design/icons';

interface SidebarProps {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
}

const customLists = [
    { id: 1, name: '工作任务' },
    { id: 2, name: '个人计划' },
    { id: 3, name: '学习清单' },
];

const Sidebar: React.FC<SidebarProps> = ({ selectedSection, setSelectedSection }) => {
    return (
        <aside className="w-64 fixed h-[calc(100vh-64px)] bg-white border-r border-gray-200 pt-6">
            <div className="px-4">
                <nav className="space-y-2">
                    <button
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                            selectedSection === 'myDay' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedSection('myDay')}
                    >
                        <ScheduleOutlined />
                        <span>我的一天</span>
                    </button>
                    <button
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                            selectedSection === 'important' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedSection('important')}
                    >
                        <StarOutlined />
                        <span>重要</span>
                    </button>
                    <button
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                            selectedSection === 'quadrants' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedSection('quadrants')}
                    >
                        <AppstoreOutlined />
                        <span>四象限</span>
                    </button>
                    <button
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${
                            selectedSection === 'allTasks' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedSection('allTasks')}
                    >
                        <UnorderedListOutlined />
                        <span>所有任务</span>
                    </button>
                </nav>

                <div className="mt-8">
                    <div className="px-4 mb-2 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">自定义清单</span>
                        <Button type="text" size="small" icon={<PlusOutlined />} />
                    </div>
                    <nav className="space-y-1">
                        {customLists.map((list) => (
                            <button
                                key={list.id}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-between transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <MenuOutlined className="text-gray-500" />
                                    <span>{list.name}</span>
                                </div>
                                <EllipsisOutlined className="text-gray-400 hover:text-gray-600 transition-colors" />
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;