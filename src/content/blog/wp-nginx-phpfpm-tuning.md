---
title: WordPress 的 Nginx + PHP-FPM 调优手册（面向 1–5 万日 PV）
description: 从 Nginx、PHP-FPM、OPcache、Redis 到监控与压测，给出稳健的调优参考值与配置示例。
pubDate: 2025-10-07
updatedDate: 2025-10-07
lang: zh-CN
tags:
  - WordPress
  - Nginx
  - PHP-FPM
  - Redis
  - 性能优化
draft: false
---

## Nginx 示例

```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/html;
  index index.php index.html;

  location ~* \.(?:css|js|jpg|jpeg|png|gif|svg|webp)$ {
    expires 7d;
    add_header Cache-Control "public";
  }

  location / { try_files $uri $uri/ /index.php?$args; }

  location ~ \.php$ {
    include fastcgi_params;
    fastcgi_pass unix:/run/php/php8.1-fpm.sock;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
  }
}
```

## PHP-FPM 池（示意）

```ini
pm = dynamic
pm.max_children = 20
pm.start_servers = 4
pm.min_spare_servers = 4
pm.max_spare_servers = 10
```

## 缓存

- OPcache：开启并合理分配内存  
- 对象缓存：Redis 插件  
- 页面缓存：fastcgi_cache 或应用层插件
