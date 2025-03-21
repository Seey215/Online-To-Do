# Seey To-Do

> Seey, Beyond Goodbyes

An online to-do list application built using Next.js for the frontend and Nest.js for the backend.

## 项目描述

基于Next.js和Nest.js的在线待办事项应用程序。

用户人群：针对小团体（例如家庭、团队）的在线待办事项应用程序。

特点：使用socket.io进行协同编辑。

Next版本：app router

## 技术栈

- **Frontend**: 
  - Next.js (React框架)
  - TypeScript
  - Tailwind CSS (样式)
- **Backend**: 
  - Nest.js (Node.js框架)
  - TypeScript
  - Socket.IO (实时通信)
- **Database**: 
  - MongoDB (数据存储)
- **其他工具**:
  - Docker (容器化)
  - ESLint + Prettier (代码质量)

## 项目目录

## 安装与运行

### 客户端 (Frontend)
1. 进入 `client` 目录：
   ```bash
   cd client
   ```

## 接口清单

路由

任务Task，四象限（重要、不重要、紧急、不紧急）

1. user
2. task

## 表设计

tbl_task

```sql
id
create_time
update_time
delete_time
content
四象限：[]
```


## 前端layout

左边侧边栏30%，中间内容70%

master-go
