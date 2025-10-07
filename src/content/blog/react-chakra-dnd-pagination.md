---
title: 在 React + Chakra UI 中实现文件夹拖拽排序与分页管理：一个内部系统的实战案例
description: 使用 React、Chakra UI 与 dnd-kit 实现文档管理模块的架构设计、拖拽排序、分页与踩坑记录，并介绍 Vite mock 与 Option/Result 风格的错误处理。
pubDate: 2025-10-07
updatedDate: 2025-10-07
lang: zh-CN
tags:
  - React
  - Chakra UI
  - dnd-kit
  - Vite
  - TypeScript
  - 前端工程
draft: false
heroImage: /images/blog/react-chakra-dnd-pagination-cover.jpg
---

## 前言

在日常的企业内部系统开发中，文档与文件夹的管理是非常常见的功能模块。看似简单的「列表 + 拖拽 + 分页」，实际开发中往往牵一发而动全身。  
本文将分享我在使用 React、Chakra UI 和 dnd-kit 构建文档管理系统时的架构设计与踩坑经验，适合对前端工程体系化实现感兴趣的读者。

## 技术栈与背景

- **React 18**：前端核心框架  
- **Chakra UI**：UI 组件库，负责界面快速搭建与主题统一  
- **dnd-kit**：实现文件夹/文件卡片的拖拽排序  
- **Vite**：构建工具，提供快速的本地开发与 mock 支持  
- **TypeScript**：保证类型安全  
- **Rust 风格 Option/Result**：自定义工具，提升 API 异常处理的优雅度

### 系统目标

- 文件与文件夹的统一展示  
- 拖拽排序与层级管理  
- 分页加载  
- 文件夹/文件的创建、重命名与删除  
- mock 与真实 API 的无缝切换

## 架构设计

### 1) 状态管理（Zustand + Option）

系统采用了 `zustand` 作为轻量状态管理工具，将 `documents`、`currentFolder`、`isLoading` 统一集中管理，配合 Rust 风格 `Option` 工具类处理「可能为空」的状态。

```ts
// stores/document.ts
import { create } from 'zustand'
import { Option } from '@/shared/utils/rust'
import type { DocumentItem } from '../components/DocumentGridList'

export type DocumentItem = {
  id: string
  type: 'file' | 'folder'
  name: string
  path: string
  parentId?: string
  verified?: boolean
  presentation?: boolean
}

type State = {
  isLoading: boolean
  documents: Option<DocumentItem[]>
  currentFolder: Option<DocumentItem>
  setLoading: (v: boolean) => void
  setDocuments: (v: Option<DocumentItem[]>) => void
  setCurrentFolder: (v: Option<DocumentItem>) => void
}

export const useDocumentStore = create<State>(set => ({
  isLoading: false,
  documents: Option.none(),
  currentFolder: Option.none(),
  setLoading: v => set({ isLoading: v }),
  setDocuments: v => set({ documents: v }),
  setCurrentFolder: v => set({ currentFolder: v })
}))
```

这种结构的好处是直观且可维护：每个状态的变化点都明确，不容易出现状态不同步。

### 2) 拖拽排序（dnd-kit）

通过 `SortableContext` 与 `useSortable` 为每个文件/文件夹组件增加拖拽行为：

```tsx
import { SortableContext } from '@dnd-kit/sortable'

<SortableContext items={documents.map(d => d.id)}>
  {documents.map(doc => (
    <FileCard key={doc.id} id={doc.id} name={doc.name} />
  ))}
</SortableContext>
```

内部用 `arrayMove` 来重排 `documents`，并通过 store 进行全局更新，从而保证 UI 与数据同步。

### 3) 分页加载与 UI 状态分离

分页部分单独抽成 `useDocumentPagination`：

1. 监听当前文件夹 ID 变化  
2. 请求当前页数据（mock or real API）  
3. 合并 / 覆盖数据  
4. 更新 store

UI 完全由 Chakra 组件（`Grid`, `Spinner`, `Button`）来拼装，实现逻辑与表现分离。

## 踩坑记录

### Chakra UI 与 dnd-kit 样式冲突
拖拽时 Chakra 的 `Box` 默认属性和 dnd-kit 的 transform 样式会互相覆盖，导致元素“飘移”。解决方式：在拖拽元素外再包一层容器，样式交给 Chakra，transform 交给 dnd-kit。

### Vite mock 热更新异常
初期使用 `vite-plugin-mock` 时，mock 路径和环境变量没对齐，导致 POST 请求 404。最终通过 `VITE_USE_MOCK` + `vite.config.ts` 的路径重写解决。

## 总结

这个文档管理模块的开发让我意识到：**一个前端模块的复杂度，不在 UI，而在状态、交互和扩展性上**。通过合理的状态管理、逻辑抽象与工具组合，可以让复杂模块保持清晰的架构。

未来可扩展：

- 文件夹树形结构  
- 跨文件夹拖拽移动  
- 服务端分页 + 搜索联动

## 延伸阅读

- dnd-kit 官方文档: https://docs.dndkit.com/  
- Chakra UI: https://chakra-ui.com/  
- Rust Option/Result: https://doc.rust-lang.org/std/option/
