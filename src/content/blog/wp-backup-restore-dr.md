---
title: WordPress 备份与灾备：WP-CLI + 数据库 + 媒体
description: 用 WP-CLI、mysqldump、对象存储版本控制，搭建可验证的备份/恢复流程，并提供最小化 DR 演练脚本。
pubDate: 2025-10-07
updatedDate: 2025-10-07
lang: zh-CN
tags:
  - WordPress
  - 备份
  - 灾难恢复
  - MySQL
  - WP-CLI
  - S3
draft: false
---

## 备份脚本（示意）

```bash
TS=$(date +%Y%m%d-%H%M%S)
mkdir -p /var/backups/wp/$TS
mysqldump -u wpuser -p'pass' --single-transaction wpdb > /var/backups/wp/$TS/db.sql
tar -czf /var/backups/wp/$TS/uploads.tar.gz -C /var/www/html wp-content/uploads
```

## 恢复

```bash
mysql -u wpuser -p'pass' wpdb < db.sql
tar -xzf uploads.tar.gz -C /var/www/html
wp search-replace 'old.example.com' 'new.example.com' --all-tables
wp cache flush
```
