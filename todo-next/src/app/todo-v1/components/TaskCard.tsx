// src/app/todo-v1/components/TaskCard.tsx
import React from 'react';
import { Checkbox } from 'antd';
import { StarFilled, StarOutlined, BellFilled, BellOutlined, EllipsisOutlined } from '@ant-design/icons';

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
                <div className="flex-1 ml-3">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <div className="flex items-center space-x-2">
                            {task.important ? (
                                <StarFilled style={{ color: '#FFB800' }} />
                            ) : (
                                <StarOutlined className="text-gray-400" />
                            )}
                            {task.reminder ? (
                                <BellFilled style={{ color: '#1677FF' }} />
                            ) : (
                                <BellOutlined className="text-gray-400" />
                            )}
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

export default TaskCard;
