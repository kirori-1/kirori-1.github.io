---
title: WordPress 媒体上云：S3 + CloudFront 的落地与回滚预案
description: 将媒体迁移到 S3，并通过 CloudFront 分发，覆盖 IAM 策略、插件选择、缓存与失效策略、常见坑与回滚方案。
pubDate: 2025-10-07
updatedDate: 2025-10-07
lang: zh-CN
tags:
  - WordPress
  - AWS
  - S3
  - CloudFront
  - CDN
  - 媒体迁移
draft: false
---

## 步骤

1) 建 S3 桶（版本控制） → 2) 建 CloudFront 分发 → 3) 配最小权限 IAM  
4) 安装 Offload 插件 → 5) 切换 URL → 6) 配置失效策略

## IAM（示意）

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:PutObject","s3:GetObject","s3:DeleteObject"],
    "Resource": ["arn:aws:s3:::your-bucket/uploads/*"]
  }]
}
```

## 回滚

- 保留本地上传目录备份；插件关闭 Offload；回填对象；DNS 回切。
