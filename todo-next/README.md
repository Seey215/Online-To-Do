This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 目录结构

```
/frontend
├── src
│   ├── app
│   │   ├── layout.tsx   # 全局 Layout
│   │   ├── page.tsx     # 首页
│   │   ├── dashboard
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   ├── api          # Next.js API 路由（可选）
│   │   │   ├── auth
│   │   │   │   ├── route.ts
│   │   │   ├── user
│   │   │   │   ├── route.ts
│   ├── components       # 组件目录
│   ├── hooks            # React 自定义 Hook
│   ├── lib
│   │   ├── axios.ts     # axios 实例封装
│   ├── services         # 业务 API 服务封装
│   │   ├── auth.ts
│   │   ├── user.ts
│   ├── utils            # 工具函数
│   │   ├── format.ts
│   ├── styles           # 样式文件
│   ├── types            # TypeScript 类型定义
│   ├── constants        # 全局常量
│   ├── middleware.ts    # 中间件（如鉴权）
│   ├── layout.tsx       # 顶层 Layout
│   ├── page.tsx         # 入口页面
│   ├── error.tsx        # 错误边界
├── public               # 静态资源
├── .env                 # 环境变量
├── next.config.js       # Next.js 配置
├── tsconfig.json        # TypeScript 配置
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## 目录结构划分逻辑

/frontend
├── src
│   ├── app
│   │   ├── layout.tsx                  # 全局 Layout
│   │   ├── page.tsx                    # 首页（重定向到任务列表或登录页面）
│   │   ├── todo                        # To-Do 相关页面
│   │   │   ├── page.tsx                # 任务列表页面
│   │   │   ├── [id]                    # 动态路由：任务详情页面
│   │   │   │   ├── page.tsx            # 任务详情页面
│   │   │   ├── create                  # 创建任务页面
│   │   │   │   ├── page.tsx            # 创建任务表单页面
│   │   │   ├── edit                    # 编辑任务页面
│   │   │   │   ├── [id]
│   │   │   │   │   ├── page.tsx        # 编辑任务表单页面
│   │   ├── auth                        # 认证相关页面
│   │   │   ├── login                   # 登录页面
│   │   │   │   ├── page.tsx            # 登录表单页面
│   │   │   ├── register                # 注册页面
│   │   │   │   ├── page.tsx            # 注册表单页面
│   │   ├── dashboard                   # 用户仪表盘页面
│   │   │   ├── page.tsx                # 用户仪表盘
│   │   │   ├── layout.tsx              # 仪表盘布局
│   │   ├── api                         # Next.js API 路由
│   │   │   ├── tasks                   # 任务相关 API
│   │   │   │   ├── route.ts            # 任务 CRUD 接口
│   │   │   ├── auth                    # 认证相关 API
│   │   │   │   ├── route.ts            # 登录/注册接口
│   ├── components                      # 组件目录
│   │   ├── Header.tsx                  # 顶部导航栏
│   │   ├── Sidebar.tsx                 # 侧边栏
│   │   ├── TaskCard.tsx                # 任务卡片
│   │   ├── AddTaskButton.tsx           # 新建任务按钮
│   │   ├── TaskList.tsx                # 任务列表
│   │   ├── TaskForm.tsx                # 任务表单（创建/编辑任务共用）
│   │   ├── AuthForm.tsx                # 认证表单（登录/注册共用）
│   ├── hooks                           # React 自定义 Hook
│   │   ├── useAuth.ts                  # 用户认证状态管理
│   │   ├── useTasks.ts                 # 任务数据获取与管理
│   ├── lib
│   │   ├── axios.ts                    # Axios 实例封装
│   ├── services                        # 业务 API 服务封装
│   │   ├── taskService.ts              # 任务相关的 API 封装
│   │   ├── authService.ts              # 认证相关的 API 封装
│   ├── utils                           # 工具函数
│   │   ├── formatDate.ts               # 日期格式化工具
│   │   ├── validate.ts                 # 表单验证工具
│   ├── styles                          # 样式文件
│   │   ├── globals.css                 # 全局样式
│   │   ├── theme.ts                    # 主题配置（如 TailwindCSS 扩展）
│   ├── types                           # TypeScript 类型定义
│   │   ├── task.ts                     # 任务类型定义
│   │   ├── user.ts                     # 用户类型定义
│   │   ├── api.ts                      # API 响应类型定义
│   ├── constants                       # 全局常量
│   │   ├── routes.ts                   # 页面路由常量
│   │   ├── apiEndpoints.ts             # API 端点常量
│   ├── middleware.ts                   # 中间件（如鉴权）
│   ├── error.tsx                       # 错误边界
├── public                              # 静态资源
│   ├── images                          # 图片资源
│   ├── favicon.ico                     # 网站图标
├── .env                                # 环境变量
├── next.config.js                      # Next.js 配置
├── tsconfig.json                       # TypeScript 配置
详细说明
1. app 目录
layout.tsx: 定义全局布局，包括顶部导航栏和侧边栏。
page.tsx: 首页，可以重定向到任务列表页面或登录页面。
todo 目录:
page.tsx: 显示任务列表的主页面。
[id] 目录: 动态路由，用于显示任务详情页面。
create 目录: 创建任务页面。
edit/[id] 目录: 编辑任务页面。
auth 目录:
login/page.tsx: 登录页面。
register/page.tsx: 注册页面。
dashboard 目录:
page.tsx: 用户仪表盘页面，展示用户统计数据。
layout.tsx: 仪表盘的专用布局。
2. components 目录
Header.tsx: 顶部导航栏组件。
Sidebar.tsx: 侧边栏组件，包含导航菜单。
TaskCard.tsx: 单个任务卡片组件。
AddTaskButton.tsx: 新建任务按钮组件。
TaskList.tsx: 任务列表组件，负责渲染多个 TaskCard。
TaskForm.tsx: 任务表单组件，用于创建和编辑任务。
AuthForm.tsx: 认证表单组件，用于登录和注册。
3. hooks 目录
useAuth.ts: 自定义 Hook，用于管理用户认证状态（如登录、登出）。
useTasks.ts: 自定义 Hook，用于获取和管理任务数据。
4. lib 目录
axios.ts: 封装 Axios 实例，统一处理请求拦截器、响应拦截器和错误处理。
5. services 目录
taskService.ts: 封装任务相关的 API 调用（如获取任务列表、创建任务、更新任务、删除任务）。
authService.ts: 封装认证相关的 API 调用（如登录、注册）。
6. utils 目录
formatDate.ts: 提供日期格式化的工具函数。
validate.ts: 提供表单验证的工具函数。
7. styles 目录
globals.css: 定义全局样式。
theme.ts: 如果使用 TailwindCSS，可以在这里扩展主题配置。
8. types 目录
task.ts: 定义任务相关的类型（如 Task, TaskResponse）。
user.ts: 定义用户相关的类型（如 User, AuthResponse）。
api.ts: 定义 API 响应的通用类型。
9. constants 目录
routes.ts: 定义页面路由常量（如 /todo, /auth/login）。
apiEndpoints.ts: 定义 API 端点常量（如 /api/tasks, /api/auth/login）。
10. public 目录
存放静态资源，如图片、图标等。
11. .env 文件
定义环境变量，如 API 基础 URL、密钥等。
12. next.config.js 和 tsconfig.json
配置 Next.js 和 TypeScript。
页面划分逻辑
首页 (/)

重定向到任务列表页面或登录页面。
如果用户已登录，跳转到 /todo；否则跳转到 /auth/login。
任务列表页面 (/todo)

显示所有任务的列表，支持筛选和排序。
任务详情页面 (/todo/[id])

显示单个任务的详细信息，支持编辑和删除操作。
创建任务页面 (/todo/create)

提供表单，用于创建新任务。
编辑任务页面 (/todo/edit/[id])

提供表单，用于编辑现有任务。
登录页面 (/auth/login)

提供登录表单，用户输入用户名和密码进行登录。
注册页面 (/auth/register)

提供注册表单，用户输入信息完成注册。
用户仪表盘页面 (/dashboard)

展示用户的统计数据，如任务完成率、待办事项数量等。
总结
通过上述目录结构和页面划分，To-Do List 项目的代码组织更加清晰，模块化程度更高，便于后续开发和维护。每个模块都有明确的职责，遵循了单一职责原则，同时也为未来的功能扩展预留了空间。