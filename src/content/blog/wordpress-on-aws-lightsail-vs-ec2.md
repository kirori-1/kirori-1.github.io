---
title: WordPress 部署在 AWS：Lightsail vs EC2 的取舍与落地
description: 结合实际项目，总结在 AWS 上用 Lightsail 与 EC2 部署 WordPress 的架构取舍、运维复杂度、可扩展性与迁移路径，并给出最小可行架构示例与 Terraform 片段。
pubDate: 2025-10-07
updatedDate: 2025-10-07
lang: zh-CN
tags:
  - WordPress
  - AWS
  - Lightsail
  - EC2
  - Terraform
  - 架构
draft: false
---

## 什么时候选 Lightsail，什么时候选 EC2

- **Lightsail**（省心型）：一体化镜像、固定带宽包月、面板操作快，适合小团队/快速上线；**定制和扩展性有限**。  
- **EC2**（可塑型）：自由组合 Nginx + PHP-FPM + MariaDB、VPC/ALB/ASG 深度集成，适合中大型/合规；**运维门槛更高**。

## 常见架构

1) 单机：EC2(Nginx+PHP-FPM+DB)  
2) 分层：EC2(Web) + RDS(DB) + S3/CloudFront(媒体)  
3) 弹性：ALB + ASG(EC2) + RDS Multi-AZ + S3 + ElastiCache

## Terraform 片段（示意）

```tf
resource "aws_instance" "wp" {
  ami           = "ami-xxxxxxxx"
  instance_type = "t3.small"
  # 省略 user_data：安装 Nginx/PHP/WordPress
}
```

## 迁移路径（Lightsail → EC2/RDS）

- `wp-cli`/迁移插件导出 → RDS 导入 → EC2 部署 → 切换 `wp-config.php` → S3/CloudFront 托管媒体 → DNS 切换与回退。
