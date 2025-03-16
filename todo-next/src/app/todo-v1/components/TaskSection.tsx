// src/app/todo-v1/components/TaskSection.tsx
import React from 'react';
import TaskCard from './TaskCard';

interface TaskSectionProps {
    title: string;
    color: string;
    tasks: any[];
}

const TaskSection: React.FC<TaskSectionProps> = ({ title, color, tasks }) => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className={`text-lg font-medium mb-4 ${color}`}>{title}</h3>
            <div className="space-y-4">
                {tasks.map((task: any) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TaskSection;