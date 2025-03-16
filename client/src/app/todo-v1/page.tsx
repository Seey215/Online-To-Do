// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果
import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, message, DatePicker, Select, Avatar, Dropdown, Menu, Badge } from 'antd';
import { DeleteOutlined, PlusOutlined, CheckCircleOutlined, BellOutlined, StarOutlined, SearchOutlined, CalendarOutlined, UnorderedListOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
interface TodoItem {
  id: number;
  content: string;
  completed: boolean;
  priority?: 'important-urgent' | 'important-not-urgent' | 'not-important-urgent' | 'not-important-not-urgent';
  isImportant?: boolean;
  isMyDay?: boolean;
  dueDate?: string;
  reminder?: string;
}

interface CustomList {
  id: string;
  name: string;
  icon: string;
}
const App: React.FC = () => {
const [selectedPriority, setSelectedPriority] = useState<string>('');
const [selectedDate, setSelectedDate] = useState<string>('');
const [selectedReminder, setSelectedReminder] = useState<string>('');

const filteredTodos = todos.filter(todo => {
  const matchesSearch = todo.content.toLowerCase().includes(searchText.toLowerCase());
  const matchesList = selectedList === 'all' ? true :
    selectedList === 'myDay' ? todo.isMyDay :
    selectedList === 'important' ? todo.isImportant :
    todo.listId === selectedList;
  return matchesSearch && matchesList;
});

const [currentUser] = useState({
name: 'Christina Wilson',
avatar: 'https://ai-public.mastergo.com/ai/img_res/3c8e7e1079f053ed1f07fde4237e71a9.jpg'
});
const [todos, setTodos] = useState<TodoItem[]>([
{ id: 1, content: '完成产品设计文档的修订和评审', completed: false, priority: 'important-urgent', isImportant: true, isMyDay: true, dueDate: '2024-01-20', reminder: '2024-01-20 09:00' },
{ id: 2, content: '准备下周团队会议的演示材料', completed: true, priority: 'important-not-urgent', isImportant: true, isMyDay: false },
{ id: 3, content: '与客户沟通新功能需求变更', completed: false, priority: 'important-urgent', isImportant: true, isMyDay: true, dueDate: '2024-01-21' },
{ id: 4, content: '优化用户界面交互体验', completed: false, priority: 'not-important-urgent', isImportant: false, isMyDay: true },
{ id: 5, content: '检查并更新项目进度报告', completed: true, priority: 'important-not-urgent', isImportant: true, isMyDay: false },
{ id: 6, content: '安排团队建设活动', completed: false, priority: 'not-important-not-urgent', isImportant: false, isMyDay: false },
{ id: 7, content: '评估新技术方案的可行性', completed: false, priority: 'important-urgent', isImportant: true, isMyDay: true },
{ id: 8, content: '整理本周工作总结文档', completed: true, priority: 'not-important-urgent', isImportant: false, isMyDay: false },
]);
const [customLists] = useState<CustomList[]>([
{ id: '1', name: '工作项目', icon: 'fa-briefcase' },
{ id: '2', name: '个人发展', icon: 'fa-book' },
{ id: '3', name: '家庭事务', icon: 'fa-home' },
]);
const [searchText, setSearchText] = useState('');
const [selectedList, setSelectedList] = useState('all');
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
<div className="min-h-screen bg-gray-50 flex">
{/* Sidebar */}
<div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col h-screen fixed">
<div className="flex items-center gap-3 mb-8">
<Avatar src={currentUser.avatar} size={40} />
<div>
<div className="font-medium">{currentUser.name}</div>
<div className="text-sm text-gray-500">个人工作区</div>
</div>
</div>
<div className="space-y-2">
<button
onClick={() => setSelectedList('all')}
className={`flex items-center gap-3 w-full p-2 rounded-lg ${
selectedList === 'all' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
}`}
>
<UnorderedListOutlined />
<span>所有任务</span>
</button>
<button
onClick={() => setSelectedList('myDay')}
className={`flex items-center gap-3 w-full p-2 rounded-lg ${
selectedList === 'myDay' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
}`}
>
<CalendarOutlined />
<span>我的一天</span>
</button>
<button
onClick={() => setSelectedList('important')}
className={`flex items-center gap-3 w-full p-2 rounded-lg ${
selectedList === 'important' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
}`}
>
<StarOutlined />
<span>重要</span>
</button>
</div>
<div className="mt-8">
<div className="text-sm font-medium text-gray-500 mb-2">自定义列表</div>
<div className="space-y-2">
{customLists.map(list => (
<button
key={list.id}
onClick={() => setSelectedList(list.id)}
className={`flex items-center gap-3 w-full p-2 rounded-lg ${
selectedList === list.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
}`}
>
<i className={`fas ${list.icon}`}></i>
<span>{list.name}</span>
</button>
))}
</div>
</div>
</div>
{/* Main Content */}
<div className="flex-1 ml-64 p-8">
<div className="max-w-3xl mx-auto">
{/* Search Bar */}
<div className="mb-8">
<Input
prefix={<SearchOutlined className="text-gray-400" />}
placeholder="搜索任务..."
className="w-full"
value={searchText}
onChange={(e) => setSearchText(e.target.value)}
/>
</div>
<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
待办事项清单
</h1>
<div className="mb-8 bg-white rounded-lg shadow p-4">
<div className="flex gap-4 mb-4">
<Input
value={newTodo}
onChange={(e) => setNewTodo(e.target.value)}
placeholder="添加新的待办事项..."
onPressEnter={handleAddTodo}
className="flex-1 text-base border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
/>
<Button
type="primary"
onClick={handleAddTodo}
icon={<PlusOutlined />}
className="!rounded-button whitespace-nowrap h-10 px-6 text-base font-medium bg-blue-600 hover:bg-blue-700"
>
添加
</Button>
</div>
<div className="flex gap-4 items-center">
<Select
value={selectedPriority}
onChange={setSelectedPriority}
className="w-48"
options={[
{ label: '重要且紧急', value: 'important-urgent' },
{ label: '重要不紧急', value: 'important-not-urgent' },
{ label: '不重要但紧急', value: 'not-important-urgent' },
{ label: '不重要不紧急', value: 'not-important-not-urgent' },
]}
/>
<DatePicker
placeholder="截止日期"
onChange={(_, dateString) => setSelectedDate(dateString)}
className="flex-1"
/>
<DatePicker
placeholder="提醒时间"
showTime
onChange={(_, dateString) => setSelectedReminder(dateString)}
className="flex-1"
/>
</div>
</div>
<div className="space-y-4">
{filteredTodos.map(todo => (
<div
key={todo.id}
className={`flex items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-md transition-shadow ${
todo.priority === 'important-urgent' ? 'border-red-200 bg-red-50' :
todo.priority === 'important-not-urgent' ? 'border-yellow-200 bg-yellow-50' :
todo.priority === 'not-important-urgent' ? 'border-blue-200 bg-blue-50' :
'border-gray-200'
}`}
>
<button
onClick={() => handleToggleComplete(todo.id)}
className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
>
{todo.completed && (
<CheckCircleOutlined className="text-blue-500 text-lg" />
)}
</button>
<div className="flex-1">
<div className="flex items-center gap-2">
<span className={`text-base ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
{todo.content}
</span>
{todo.isImportant && <StarOutlined className="text-yellow-500" />}
{todo.isMyDay && <CalendarOutlined className="text-blue-500" />}
</div>
{(todo.dueDate || todo.reminder) && (
<div className="text-sm text-gray-500 mt-1">
{todo.dueDate && (
<span className="mr-4">
<CalendarOutlined className="mr-1" />
截止: {todo.dueDate}
</span>
)}
{todo.reminder && (
<span>
<BellOutlined className="mr-1" />
提醒: {todo.reminder}
</span>
)}
</div>
)}
</div>
<div className="flex items-center gap-2">
<Button
type="text"
onClick={() => handleDelete(todo.id)}
icon={<DeleteOutlined />}
className="!rounded-button opacity-70 hover:opacity-100"
/>
</div>
</div>
))}
</div>
<div className="mt-8 flex justify-between items-center text-gray-500 border-t pt-4">
<div>
总计 {filteredTodos.length} 个待办事项，已完成 {filteredTodos.filter(t => t.completed).length} 个
</div>
<div className="flex gap-4">
<span>重要且紧急: {filteredTodos.filter(t => t.priority === 'important-urgent').length}</span>
<span>重要不紧急: {filteredTodos.filter(t => t.priority === 'important-not-urgent').length}</span>
<span>不重要但紧急: {filteredTodos.filter(t => t.priority === 'not-important-urgent').length}</span>
<span>不重要不紧急: {filteredTodos.filter(t => t.priority === 'not-important-not-urgent').length}</span>
</div>
</div>
</div>
</div>
</div>
);
};
export default App
