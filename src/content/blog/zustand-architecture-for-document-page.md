---
title: 用 Zustand 组织文档页状态：UI、数据与分页的三段式分离
description: 把 UI 状态、数据状态与分页状态分层管理，避免副作用与渲染风暴。
pubDate: 2025-10-07
updatedDate: 2025-10-07
lang: zh-CN
tags:
  - Zustand
  - React
  - 前端架构
  - 分页
draft: false
---

## 提要

- UI 状态（弹窗、选中、loading）
- 数据状态（当前文件夹、文档列表）
- 分页状态（page、hasMore）

## 好处

- 解耦与可测性
- 更少的无意义重渲染
