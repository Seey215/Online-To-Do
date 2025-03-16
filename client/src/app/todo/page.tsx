// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果
'use client';
import React, { useState } from 'react';
import { Input, Avatar, Button, DatePicker, TimePicker, Checkbox, Dropdown } from 'antd';
import { SearchOutlined, SettingOutlined, BellOutlined, StarOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [selectedSection, setSelectedSection] = useState('myDay');

    const userDropdownItems: MenuProps['items'] = [
        { key: 'profile', label: '个人信息' },
        { key: 'settings', label: '设置' },
        { key: 'logout', label: '退出登录' },
    ];

    const customLists = [
        { id: 1, name: '工作任务' },
        { id: 2, name: '个人计划' },
        { id: 3, name: '学习清单' },
    ];

    const tasks = [
        {
            id: 1,
            title: '完成产品需求文档',
            description: '整理本周新功能的产品需求文档，并与团队进行评审',
            dueDate: '2024-01-20',
            reminder: '2024-01-19 10:00',
            important: true,
            completed: false,
            quadrant: 'importantUrgent',
        },
        {
            id: 2,
            title: '准备季度工作总结报告',
            description: '汇总Q4各项目进展情况，分析关键指标完成情况',
            dueDate: '2024-01-25',
            reminder: '2024-01-24 14:00',
            important: true,
            completed: false,
            quadrant: 'importantNotUrgent',
        },
        {
            id: 3,
            title: '更新项目进度表',
            description: '更新本周各项目的最新进展情况',
            dueDate: '2024-01-18',
            reminder: '2024-01-18 09:00',
            important: false,
            completed: false,
            quadrant: 'notImportantUrgent',
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 顶部导航栏 */}
            <header className="h-16 bg-white shadow-sm fixed w-full top-0 z-50">
                <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Dropdown menu={{ items: userDropdownItems }} placement="bottomLeft">
                            <div className="flex items-center space-x-3 cursor-pointer">
                                <Avatar
                                    size={40}
                                    src="https://ai-public.mastergo.com/ai/img_res/5386014355a39d5c34e45d6d955b3cf4.jpg"
                                    className="border-2 border-blue-100"
                                />
                                <span className="text-gray-700 font-medium">陈思远</span>
                            </div>
                        </Dropdown>
                    </div>
                    <div className="flex items-center space-x-4">
                        {showSearch ? (
                            <div className="relative">
                                <Input
                                    prefix={<SearchOutlined className="text-gray-400" />}
                                    placeholder="搜索任务..."
                                    className="w-64 rounded-lg border-gray-200"
                                    autoFocus
                                    onBlur={() => setShowSearch(false)}
                                />
                            </div>
                        ) : (
                            <Button
                                type="text"
                                icon={<SearchOutlined />}
                                onClick={() => setShowSearch(true)}
                                className="text-gray-600 hover:text-gray-800"
                            />
                        )}
                        <Button
                            type="text"
                            icon={<SettingOutlined />}
                            className="text-gray-600 hover:text-gray-800"
                        />
                    </div>
                </div>
            </header>

            {/* 主要内容区 */}
            <div className="pt-16 flex max-w-[1440px] mx-auto">
                {/* 侧边栏 */}
                <aside className="w-64 fixed h-[calc(100vh-64px)] bg-white border-r border-gray-200 pt-6">
                    <div className="px-4">
                        <nav className="space-y-2">
                            <button
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${selectedSection === 'myDay' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                onClick={() => setSelectedSection('myDay')}
                            >
                                <i className="fas fa-sun"></i>
                                <span>我的一天</span>
                            </button>
                            <button
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${selectedSection === 'important' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                onClick={() => setSelectedSection('important')}
                            >
                                <StarOutlined />
                                <span>重要</span>
                            </button>
                            <button
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${selectedSection === 'quadrants' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                onClick={() => setSelectedSection('quadrants')}
                            >
                                <i className="fas fa-th-large"></i>
                                <span>四象限</span>
                            </button>
                            <button
                                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${selectedSection === 'allTasks' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                onClick={() => setSelectedSection('allTasks')}
                            >
                                <i className="fas fa-tasks"></i>
                                <span>所有任务</span>
                            </button>
                        </nav>

                        <div className="mt-8">
                            <div className="px-4 mb-2 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-500">自定义清单</span>
                                <Button type="text" size="small" icon={<PlusOutlined />} />
                            </div>
                            <nav className="space-y-1">
                                {customLists.map(list => (
                                    <button
                                        key={list.id}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-between"
                                    >
                                        <span>{list.name}</span>
                                        <EllipsisOutlined className="text-gray-400" />
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </aside>

                {/* 主内容区 */}
                <main className="ml-64 flex-1 p-8">
                    {selectedSection === 'quadrants' ? (
                        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-128px)]">
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="text-lg font-medium mb-4 text-red-600">重要且紧急</h3>
                                {tasks
                                    .filter(task => task.quadrant === 'importantUrgent')
                                    .map(task => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="text-lg font-medium mb-4 text-orange-600">重要不紧急</h3>
                                {tasks
                                    .filter(task => task.quadrant === 'importantNotUrgent')
                                    .map(task => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="text-lg font-medium mb-4 text-yellow-600">紧急不重要</h3>
                                {tasks
                                    .filter(task => task.quadrant === 'notImportantUrgent')
                                    .map(task => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="text-lg font-medium mb-4 text-green-600">不重要不紧急</h3>
                                {tasks
                                    .filter(task => task.quadrant === 'notImportantNotUrgent')
                                    .map(task => (
                                        <TaskCard key={task.id} task={task} />
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {tasks.map(task => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* 新建任务按钮 */}
            <button className="fixed right-8 bottom-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center">
                <PlusOutlined className="text-xl" />
            </button>
        </div>
    );
};

interface TaskCardProps {
    task: {
        id: number;
        title: string;
        description: string;
        dueDate: string;
        reminder: string;
        important: boolean;
        completed: boolean;
    };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
                <Checkbox checked={task.completed} />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <div className="flex items-center space-x-2">
                            {task.important && <StarOutlined className="text-yellow-500" />}
                            <BellOutlined className="text-gray-400" />
                            <EllipsisOutlined className="text-gray-400" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        <span>截止日期: {task.dueDate}</span>
                        <span>提醒时间: {task.reminder}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

