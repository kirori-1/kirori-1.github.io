---
title: WordPress 主题/插件的 CI/CD：GitHub Actions 到服务器
description: 用 GitHub Actions 构建主题/插件并部署到服务器，含维护模式、缓存清理与回滚策略。
pubDate: 2025-10-07
updatedDate: 2025-10-07
lang: zh-CN
tags:
  - WordPress
  - GitHub Actions
  - CI/CD
  - 部署
draft: false
---

## Workflow（简版）

```yaml
name: Deploy Theme
on:
  push:
    branches: [ main ]
    paths: [ 'wp-content/themes/mytheme/**' ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: cd wp-content/themes/mytheme && npm ci && npm run build
      - uses: easingthemes/ssh-deploy@v5.1.0
        with:
          ssh_private_key: ${{ secrets.SSH_KEY }}
          remote_host: ${{ secrets.HOST }}
          remote_user: ubuntu
          source: "wp-content/themes/mytheme"
          target: "/var/www/html/wp-content/themes/mytheme"
      - uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.HOST }}
          username: ubuntu
          key: ${{ secrets.SSH_KEY }}
          script: |
            wp maintenance-mode activate || true
            wp cache flush || true
            wp maintenance-mode deactivate || true
```

## 回滚

- 部署前对当前主题打包备份；失败自动恢复旧包。
