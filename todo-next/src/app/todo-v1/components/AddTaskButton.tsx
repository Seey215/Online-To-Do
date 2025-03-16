// src/app/todo-v1/components/AddTaskButton.tsx
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddTaskButton: React.FC = () => {
    return (
        <button className="fixed right-8 bottom-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center">
            <PlusOutlined className="text-xl" />
        </button>
    );
};

export default AddTaskButton;