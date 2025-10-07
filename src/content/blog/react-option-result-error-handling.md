---
title: 用 Rust 風格 Option/Result 改善 React 錯誤處理（含實戰代碼）
description: 在 React + TypeScript 專案中，引入 Rust 風格 Option/Result 來統一空值與錯誤分支處理，提升可讀性與可測試性。
pubDate: 2025-10-07
updatedDate: 2025-10-07
lang: zh-CN
tags:
  - React
  - TypeScript
  - 错误处理
  - 函数式编程
  - 前端工程
draft: false
---

> JP メモ: React の非同期処理に Rust 風の `Option` / `Result` を取り入れて、null/undefined と例外の分岐を明示化します。

## 背景

前端常見的兩類痛點：
1. **空值**（`null`/`undefined`）傳遞導致 NPE
2. **異常**在多層 async 流程中被吞掉或丟失上下文

本文示例一個極小型工具實現 + 在 React 組件中的落地方式。

## 工具定義

```ts
// shared/utils/rust.ts
export class Option<T> { /* 见正文项目内实现 */ }
export type Result<T, E = Error> = /* ... */
export async function toResult<T>(p: Promise<T>): Promise<Result<T>> { /* ... */ }
```

## 在 API 層統一錯誤

```ts
// api/document.ts
import { toResult } from '@/shared/utils/rust'

export async function fetchFolderList(pid: string | null, page = 1) {
  return await toResult(fetch('/bff-web-ns/api/folder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ parentId: pid, page })
  }).then(r => r.json()))
}
```

## 在 Hook 中下放語義化錯誤

```ts
// hooks/useDocumentPage.ts
// ... useEffect 内部调用 fetchFolderList，res.ok/res.error 分流，toast 告警
```

## 在 UI 中避免「三元地獄」

```tsx
// components/DocumentGridList.tsx
// docs.isNone() ? <EmptyState /> : <Grid>...</Grid>
```

## 小結

- `Option` 把「可能沒值」變成顯式分支
- `Result` 把「可能失敗」變成顯式分支
- 降噪、提升維護性
