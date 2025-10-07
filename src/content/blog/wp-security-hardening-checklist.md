---
title: WordPress 安全加固清单
description: 覆盖核心/插件更新、文件权限、XML-RPC/REST 控制、Nginx 限速、Fail2ban/防火墙、WAF/CDN 策略与备份演练。
pubDate: 2025-10-07
updatedDate: 2025-10-07
lang: zh-CN
tags:
  - WordPress
  - 安全
  - Nginx
  - Fail2ban
  - WAF
  - Cloudflare
draft: false
---

- 禁用后台在线编辑：`define('DISALLOW_FILE_EDIT', true);`
- 限制登录速率（Nginx `limit_req`）
- 关闭或限制 XML-RPC
- Fail2ban + Nginx 日志
- WAF/CDN、HTTPS、HSTS
- 定期备份与恢复演练
