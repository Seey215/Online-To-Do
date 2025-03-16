// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果
'use client';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AddTaskButton from './components/AddTaskButton';
import Header from './components/Header';
import TaskList from './components/TaskList';

const App: React.FC = () => {

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

    const [selectedSection, setSelectedSection] = useState('myDay');

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="pt-16 flex max-w-[1440px] mx-auto">
                <Sidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
                <main className="ml-64 flex-1 p-8">
                    <TaskList selectedSection={selectedSection} tasks={tasks} />
                </main>
            </div>
            <AddTaskButton />
        </div>
    );
};

export default App;

