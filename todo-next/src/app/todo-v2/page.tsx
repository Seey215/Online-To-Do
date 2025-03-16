// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果
'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, message } from 'antd';
import { DeleteOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface TodoItem {
  id: number;
  content: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, content: '完成产品设计文档的修订和评审', completed: false },
    { id: 2, content: '准备下周团队会议的演示材料', completed: true },
    { id: 3, content: '与客户沟通新功能需求变更', completed: false },
    { id: 4, content: '优化用户界面交互体验', completed: false },
    { id: 5, content: '检查并更新项目进度报告', completed: true },
    { id: 6, content: '安排团队建设活动', completed: false },
    { id: 7, content: '评估新技术方案的可行性', completed: false },
    { id: 8, content: '整理本周工作总结文档', completed: true },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (!newTodo.trim()) {
      message.warning('请输入待办事项内容');
      return;
    }
    const newItem: TodoItem = {
      id: Date.now(),
      content: newTodo.trim(),
      completed: false,
    };
    setTodos([...todos, newItem]);
    setNewTodo('');
    message.success('添加成功');
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个待办事项吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setTodos(todos.filter(todo => todo.id !== id));
        message.success('删除成功');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          待办事项清单
        </h1>
        
        <div className="mb-8">
          <div className="flex gap-4">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="添加新的待办事项..."
              onPressEnter={handleAddTodo}
              className="flex-1 text-base py-3 px-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <Button
              type="primary"
              onClick={handleAddTodo}
              icon={<PlusOutlined />}
              className="!rounded-button whitespace-nowrap h-12 px-6 text-base font-medium bg-blue-600 hover:bg-blue-700"
            >
              添加
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {todos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => handleToggleComplete(todo.id)}
                className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
              >
                {todo.completed && (
                  <CheckCircleOutlined className="text-blue-500 text-lg" />
                )}
              </button>
              
              <span className={`flex-1 text-base ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {todo.content}
              </span>
              
              <Button
                danger
                type="text"
                onClick={() => handleDelete(todo.id)}
                icon={<DeleteOutlined />}
                className="!rounded-button opacity-70 hover:opacity-100"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500">
          总计 {todos.length} 个待办事项，已完成 {todos.filter(t => t.completed).length} 个
        </div>
      </div>
    </div>
  );
};

export default App;

