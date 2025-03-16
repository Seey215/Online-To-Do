// src/app/todo-v1/components/Header.tsx
import React, { useState } from 'react';
import { Input, Avatar, Button, Dropdown } from 'antd';
import { SearchOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const userDropdownItems: MenuProps['items'] = [
    { key: 'profile', label: '个人信息' },
    { key: 'settings', label: '设置' },
    { key: 'logout', label: '退出登录' },
];

const Header: React.FC = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
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
                            <span className="text-gray-700 font-medium ml-3">陈思远</span>
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
    );
};

export default Header;