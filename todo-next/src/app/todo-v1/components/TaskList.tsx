// src/app/todo-v1/components/TaskList.tsx
import React from 'react';
import TaskSection from './TaskSection';
import TaskCard from './TaskCard';

interface TaskListProps {
    selectedSection: string;
    tasks: any[];
}

const TaskList: React.FC<TaskListProps> = ({ selectedSection, tasks }) => {
    if (selectedSection === 'quadrants') {
        return (
            <div className="grid grid-cols-2 gap-6 h-[calc(100vh-128px)]">
                <TaskSection title="重要且紧急" color="text-red-600" tasks={tasks.filter(task => task.quadrant === 'importantUrgent')} />
                <TaskSection title="重要不紧急" color="text-orange-600" tasks={tasks.filter(task => task.quadrant === 'importantNotUrgent')} />
                <TaskSection title="紧急不重要" color="text-yellow-600" tasks={tasks.filter(task => task.quadrant === 'notImportantUrgent')} />
                <TaskSection title="不重要不紧急" color="text-green-600" tasks={tasks.filter(task => task.quadrant === 'notImportantNotUrgent')} />
            </div>
        );
    } else {
        return (
            <div className="space-y-4">
                {tasks.map((task: any) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        );
    }
};

export default TaskList;