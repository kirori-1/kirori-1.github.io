export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  tags: string[];
}

export const categories: Category[] = [
  {
    id: "all",
    name: "全部",
    description: "所有文章",
    icon: "📋",
    color: "gray",
    tags: [],
  },
  {
    id: "audio",
    name: "音响技术",
    description: "音频工程、音响系统、现场调音等技术文章",
    icon: "🎵",
    color: "blue",
    tags: [
      "音响技术",
      "声学原理",
      "系统架构",
      "信号流程",
      "话筒技术",
      "舞台布置",
      "现场音响",
      "音频工程",
      "基础理论",
      "技术教程",
    ],
  },
  {
    id: "programming",
    name: "编程开发",
    description: "前端开发、后端技术、工具使用等编程相关文章",
    icon: "💻",
    color: "green",
    tags: [
      "React",
      "TypeScript",
      "前端工程",
      "Chakra UI",
      "dnd-kit",
      "Vite",
      "Zustand",
      "前端架构",
      "分页",
      "错误处理",
      "函数式编程",
    ],
  },
  {
    id: "wordpress",
    name: "WordPress",
    description: "WordPress 部署、优化、安全等相关技术文章",
    icon: "🌐",
    color: "purple",
    tags: [
      "WordPress",
      "AWS",
      "Lightsail",
      "EC2",
      "Terraform",
      "架构",
      "备份",
      "灾难恢复",
      "MySQL",
      "WP-CLI",
      "S3",
      "GitHub Actions",
      "CI/CD",
      "部署",
      "Nginx",
      "PHP-FPM",
      "Redis",
      "性能优化",
    ],
  },
  {
    id: "tools",
    name: "工具文档",
    description: "开发工具、文档系统、Markdown 等技术文档",
    icon: "📚",
    color: "orange",
    tags: ["Markdown", "文档", "教程", "前端", "工具", "MDX"],
  },
  {
    id: "philosophy",
    name: "哲学学习",
    description: "哲学思考、思辨文章、理论学习等",
    icon: "🤔",
    color: "indigo",
    tags: ["哲学", "思辨", "理论", "思考", "学习", "智慧"],
  },
  {
    id: "creative",
    name: "剧本创作",
    description: "剧本写作、创作技巧、故事创作等",
    icon: "📝",
    color: "pink",
    tags: ["剧本", "写作", "创作", "故事", "编剧", "文学", "艺术"],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getCategoryByTag(tag: string): Category | undefined {
  return categories.find((cat) => cat.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allTags = new Set<string>();
  categories.forEach((category) => {
    category.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}
