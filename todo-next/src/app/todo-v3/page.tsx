// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果
'use client'
import React, { useState } from 'react';
import { Layout, Input, Button, Avatar, Dropdown, DatePicker, TimePicker, Modal, Select, Checkbox } from 'antd';
import type { MenuProps } from 'antd';
import {
    SearchOutlined,
    SettingOutlined,
    PlusOutlined,
    StarOutlined,
    StarFilled,
    BellOutlined,
    DeleteOutlined,
    EditOutlined,
    ClockCircleOutlined,
    CalendarOutlined,
    UnorderedListOutlined,
    AppstoreOutlined,
    RightOutlined
} from '@ant-design/icons';
// import * as echarts from 'echarts';
const { Header, Sider, Content } = Layout;
interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    reminder: string;
    important: boolean;
    completed: boolean;
    quadrant: number;
    list: string;
}
const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            title: '完成季度工作报告',
            description: '整理第三季度工作内容，编写详细报告并制作演示文稿',
            dueDate: '2024-01-20',
            reminder: '2024-01-19 10:00',
            important: true,
            completed: false,
            quadrant: 1,
            list: '工作'
        },
        {
            id: '2',
            title: '准备产品发布会演讲稿',
            description: '撰写新产品发布会的演讲稿，包含产品亮点和市场策略',
            dueDate: '2024-01-25',
            reminder: '2024-01-24 14:00',
            important: true,
            completed: false,
            quadrant: 2,
            list: '工作'
        }
    ]);
    const [selectedView, setSelectedView] = useState('myDay');
    const [searchVisible, setSearchVisible] = useState(false);
    const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
    const userMenuItems: MenuProps['items'] = [
        {
            key: '1',
            label: '个人设置',
            icon: <SettingOutlined />
        },
        {
            key: '2',
            label: '退出登录',
            danger: true
        }
    ];
    // 初始化四象限图表
    React.useEffect(() => {
        // if (selectedView === 'quadrant') {
        //     const chartDom = document.getElementById('quadrantChart');
        //     if (chartDom) {
        //         const myChart = echarts.init(chartDom);
        //         const option = {
        //             animation: false,
        //             title: {
        //                 text: '任务四象限分布'
        //             },
        //             xAxis: {
        //                 type: 'category',
        //                 data: ['不紧急', '紧急']
        //             },
        //             yAxis: {
        //                 type: 'category',
        //                 data: ['不重要', '重要']
        //             },
        //             series: [{
        //                 type: 'scatter',
        //                 data: tasks.map(task => [
        //                     task.quadrant % 2,
        //                     Math.floor(task.quadrant / 2),
        //                     task.title
        //                 ]),
        //                 symbolSize: 20,
        //                 label: {
        //                     show: true,
        //                     formatter: (params: any) => params.data[2]
        //                 }
        //             }]
        //         };
        //         myChart.setOption(option);
        //     }
        // }
    }, [selectedView, tasks]);
    return (
        <Layout className="min-h-screen">
            <Layout>
                <Sider width="30%" className="bg-gray-50 p-6">
                    <div className="mb-6">
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomLeft">
                            <div className="flex items-center cursor-pointer mb-4">
                                <Avatar
                                    size={48}
                                    src="https://ai-public.mastergo.com/ai/img_res/68136842d651d12bf112e36b342fb664.jpg"
                                    className="mr-3"
                                />
                                <span className="text-lg font-medium">陈思远</span>
                            </div>
                        </Dropdown>
                        {searchVisible ? (
                            <Input
                                prefix={<SearchOutlined className="text-gray-400" />}
                                placeholder="搜索任务..."
                                className="w-full rounded-lg border-gray-200"
                                autoFocus
                                onBlur={() => setSearchVisible(false)}
                            />
                        ) : (
                            <Button
                                icon={<SearchOutlined />}
                                type="text"
                                className="mb-4 !rounded-button"
                                onClick={() => setSearchVisible(true)}
                                block
                            >
                                搜索任务
                            </Button>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Button
                            type={selectedView === 'myDay' ? 'primary' : 'text'}
                            block
                            icon={<i className="fas fa-sun mr-2" />}
                            onClick={() => setSelectedView('myDay')}
                            className="text-left h-12 !rounded-button"
                        >
                            我的一天
                        </Button>
                        <Button
                            type={selectedView === 'important' ? 'primary' : 'text'}
                            block
                            icon={<StarOutlined className="mr-2" />}
                            onClick={() => setSelectedView('important')}
                            className="text-left h-12 !rounded-button"
                        >
                            重要
                        </Button>
                        <Button
                            type={selectedView === 'quadrant' ? 'primary' : 'text'}
                            block
                            icon={<AppstoreOutlined className="mr-2" />}
                            onClick={() => setSelectedView('quadrant')}
                            className="text-left h-12 !rounded-button"
                        >
                            四象限视图
                        </Button>
                        <Button
                            type={selectedView === 'all' ? 'primary' : 'text'}
                            block
                            icon={<UnorderedListOutlined className="mr-2" />}
                            onClick={() => setSelectedView('all')}
                            className="text-left h-12 !rounded-button"
                        >
                            所有任务
                        </Button>
                    </div>
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-medium">自定义清单</span>
                            <Button
                                type="text"
                                icon={<PlusOutlined />}
                                className="!rounded-button"
                            />
                        </div>
                        <div className="space-y-2">
                            <Button
                                type="text"
                                block
                                icon={<i className="fas fa-briefcase mr-2" />}
                                className="text-left h-12 !rounded-button"
                            >
                                工作
                            </Button>
                            <Button
                                type="text"
                                block
                                icon={<i className="fas fa-home mr-2" />}
                                className="text-left h-12 !rounded-button"
                            >
                                个人
                            </Button>
                            <Button
                                type="text"
                                block
                                icon={<i className="fas fa-shopping-cart mr-2" />}
                                className="text-left h-12 !rounded-button"
                            >
                                购物清单
                            </Button>
                        </div>
                    </div>
                </Sider>
                <Content className="bg-white p-8" style={{ width: "70%" }}>
                    {selectedView === 'quadrant' ? (
                        <div id="quadrantChart" style={{ width: '100%', height: '600px' }} />
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-medium">
                                    {selectedView === 'myDay' && '我的一天'}
                                    {selectedView === 'important' && '重要任务'}
                                    {selectedView === 'all' && '所有任务'}
                                </h1>
                                <div className="space-x-2">
                                    <Button
                                        icon={<i className="fas fa-sort mr-2" />}
                                        className="!rounded-button"
                                    >
                                        排序
                                    </Button>
                                    <Button
                                        icon={<i className="fas fa-filter mr-2" />}
                                        className="!rounded-button"
                                    >
                                        筛选
                                    </Button>
                                </div>
                            </div>
                            {tasks.map(task => (
                                <div
                                    key={task.id}
                                    className={`p-4 border rounded-lg ${task.completed ? 'bg-gray-50' : 'bg-white'}`}
                                >
                                    <div className="flex items-center">
                                        <Checkbox
                                            checked={task.completed}
                                            className="mr-3"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
                                                    {task.title}
                                                </span>
                                                <Button
                                                    type="text"
                                                    icon={task.important ? <StarFilled className="text-yellow-500" /> : <StarOutlined />}
                                                    className="ml-2 !rounded-button"
                                                />
                                            </div>
                                            <div className="mt-2 text-sm text-gray-500 flex items-center space-x-4">
                                                <span className="flex items-center">
                                                    <CalendarOutlined className="mr-1" />
                                                    {task.dueDate}
                                                </span>
                                                <span className="flex items-center">
                                                    <BellOutlined className="mr-1" />
                                                    {task.reminder}
                                                </span>
                                                <span className="flex items-center">
                                                    <i className="fas fa-list-ul mr-1" />
                                                    {task.list}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                type="text"
                                                icon={<EditOutlined />}
                                                className="!rounded-button"
                                            />
                                            <Button
                                                type="text"
                                                icon={<DeleteOutlined />}
                                                className="!rounded-button"
                                            />
                                            <Button
                                                type="text"
                                                icon={<RightOutlined />}
                                                className="!rounded-button"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Content>
            </Layout>
            <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="large"
                className="fixed right-8 bottom-8 shadow-lg"
                onClick={() => setNewTaskModalVisible(true)}
            />
            <Modal
                title="新建任务"
                open={newTaskModalVisible}
                onCancel={() => setNewTaskModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setNewTaskModalVisible(false)}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary">
                        创建
                    </Button>
                ]}
                width={600}
            >
                <div className="space-y-4">
                    <Input placeholder="任务标题" size="large" />
                    <Input.TextArea placeholder="任务描述" rows={4} />
                    <div className="flex space-x-4">
                        <DatePicker
                            placeholder="截止日期"
                            className="flex-1"
                            size="large"
                        />
                        <TimePicker
                            placeholder="提醒时间"
                            className="flex-1"
                            size="large"
                        />
                    </div>
                    <Select
                        placeholder="选择清单"
                        className="w-full"
                        size="large"
                        options={[
                            { value: 'work', label: '工作' },
                            { value: 'personal', label: '个人' },
                            { value: 'shopping', label: '购物清单' }
                        ]}
                    />
                    <div className="flex items-center space-x-4">
                        <Checkbox>标记为重要</Checkbox>
                        <Select
                            placeholder="选择象限"
                            className="flex-1"
                            size="large"
                            options={[
                                { value: 1, label: '重要且紧急' },
                                { value: 2, label: '重要不紧急' },
                                { value: 3, label: '紧急不重要' },
                                { value: 4, label: '不重要不紧急' }
                            ]}
                        />
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};
export default App
