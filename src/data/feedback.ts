/**
 * XCMove - 开发反馈收集系统
 * 
 * 用于记录开发过程中的问题、改进建议和经验教训。
 * 这些反馈将用于改进 AI Dev Platform 框架。
 */

export interface FeedbackItem {
  id: string;
  timestamp: Date;
  category: FeedbackCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  context?: string;
  suggestedFix?: string;
  status: 'open' | 'in_progress' | 'resolved';
  tags: string[];
}

export type FeedbackCategory = 
  | 'code_quality'      // 代码质量问题
  | 'architecture'       // 架构设计问题
  | 'performance'        // 性能问题
  | 'ui_ux'              // 界面体验问题
  | 'framework'          // 框架本身的问题
  | 'llm_generation'     // LLM生成代码的质量问题
  | 'tool_integration'   // 工具集成问题
  | 'missing_feature'    // 缺失功能
  | 'improvement'        // 改进建议
  | 'other';             // 其他

// 初始反馈数据（基于本次开发过程）
export const initialFeedback: FeedbackItem[] = [
  {
    id: 'fb-001',
    timestamp: new Date('2026-05-12T10:00:00Z'),
    category: 'framework',
    severity: 'medium',
    title: 'LangGraph TypeScript 支持有限',
    description: 'LangGraph 主要面向 Python，TypeScript 版本的 API 不够稳定，部分功能缺失。状态机编译时类型推断不够完善。',
    context: '在实现 OrchestratorAgent 时，StateGraph 的 TypeScript 泛型支持较弱，需要手动类型断言。',
    suggestedFix: '考虑后续自研轻量级状态机，或等待 LangGraph JS 版本成熟。也可以评估 Mastra 框架作为替代。',
    status: 'open',
    tags: ['langgraph', 'typescript', 'agent-framework'],
  },
  {
    id: 'fb-002',
    timestamp: new Date('2026-05-12T10:05:00Z'),
    category: 'llm_generation',
    severity: 'medium',
    title: 'LLM 生成的代码需要人工验证',
    description: 'DeepSeek V4 生成的代码质量不错，但偶尔会出现：1) 导入路径错误 2) API 使用方式过时 3) 缺少错误处理。需要测试Agent来捕获这些问题。',
    context: '在生成电影平台代码时，部分组件的 lucide-react 导入名称和实际包中的名称不一致。',
    suggestedFix: '在开发Agent中增加代码静态检查步骤（ESLint），在写入文件前先验证代码语法。增加LLM重试机制。',
    status: 'open',
    tags: ['deepseek', 'code-generation', 'quality'],
  },
  {
    id: 'fb-003',
    timestamp: new Date('2026-05-12T10:10:00Z'),
    category: 'architecture',
    severity: 'high',
    title: 'Agent 间通信机制不够灵活',
    description: '当前 Agent 间通过共享文件系统和状态对象通信，缺乏结构化的消息传递机制。当测试Agent发现Bug时，反馈给开发Agent的信息格式不够标准化。',
    context: '测试Agent的失败信息需要被结构化为：文件路径、错误类型、错误消息、堆栈跟踪，但当前只是简单的字符串传递。',
    suggestedFix: '定义标准的 Agent 间通信协议（IPC），使用 TypeScript 接口定义消息格式。参考 AutoGen 的消息传递机制。',
    status: 'open',
    tags: ['agent-communication', 'architecture', 'protocol'],
  },
  {
    id: 'fb-004',
    timestamp: new Date('2026-05-12T10:15:00Z'),
    category: 'missing_feature',
    severity: 'medium',
    title: '缺少预览环境集成',
    description: '开发完成后，用户需要手动启动项目才能看到效果。应该自动启动预览服务器并提供访问链接。',
    context: '电影平台开发完成后，需要运行 npm run dev 才能预览，不够自动化。',
    suggestedFix: '在 OrchestratorAgent 中增加预览步骤：开发完成后自动启动 dev server，生成预览URL，通知用户。',
    status: 'open',
    tags: ['preview', 'automation', 'user-experience'],
  },
  {
    id: 'fb-005',
    timestamp: new Date('2026-05-12T10:20:00Z'),
    category: 'tool_integration',
    severity: 'low',
    title: 'bubblewrap 在某些环境下不可用',
    description: 'bubblewrap 主要在 Linux 上可用，macOS 和 Windows 需要降级到直接子进程执行，安全性降低。',
    context: 'Sandbox 类中已有降级逻辑，但直接执行的安全性远不如 bubblewrap。',
    suggestedFix: 'Phase 4 考虑使用 Firecracker MicroVM 或 WebContainers 实现跨平台安全隔离。',
    status: 'open',
    tags: ['sandbox', 'security', 'cross-platform'],
  },
  {
    id: 'fb-006',
    timestamp: new Date('2026-05-12T10:25:00Z'),
    category: 'improvement',
    severity: 'medium',
    title: '需要增量开发而非一次性生成',
    description: '当前开发Agent倾向于一次性生成所有代码，对于大型项目容易出错。应该支持增量开发：先搭建骨架，再逐个实现功能。',
    context: '电影平台项目通过子Agent生成，效果较好。但如果项目更复杂，一次性生成的质量会下降。',
    suggestedFix: '改进任务拆解策略：将大任务拆分为更小的原子任务（每个任务只涉及1-2个文件），逐步实现并验证。',
    status: 'open',
    tags: ['incremental-development', 'task-planning', 'quality'],
  },
  {
    id: 'fb-007',
    timestamp: new Date('2026-05-12T10:30:00Z'),
    category: 'ui_ux',
    severity: 'low',
    title: '电影平台使用占位图片',
    description: '当前使用 picsum.photos 占位图片，不是真实电影海报。实际部署时需要接入电影数据库API（如TMDB）获取真实海报。',
    context: '数据层已设计好接口，只需替换数据源即可。',
    suggestedFix: '后续迭代中接入 TMDB API，获取真实电影数据、海报和预告片。',
    status: 'open',
    tags: ['data-source', 'tmdb', 'api-integration'],
  },
  {
    id: 'fb-008',
    timestamp: new Date('2026-05-12T10:35:00Z'),
    category: 'performance',
    severity: 'low',
    title: 'E2E 测试启动慢',
    description: 'Playwright 启动浏览器 + 启动 dev server 需要较长时间（约10-15秒），影响测试效率。',
    context: '每次运行 E2E 测试都需要启动完整的浏览器和开发服务器。',
    suggestedFix: '考虑使用浏览器复用（shared browser context），或者将 dev server 启动和测试执行分离，支持热重载测试。',
    status: 'open',
    tags: ['playwright', 'performance', 'e2e-testing'],
  },
  {
    id: 'fb-009',
    timestamp: new Date('2026-05-12T14:00:00Z'),
    category: 'missing_feature',
    severity: 'high',
    title: '点击"立即播放"无响应，缺少播放器页面',
    description: '用户点击电影详情页的"立即播放"按钮后，没有任何页面跳转或播放器界面出现。虽然当前没有真实视频数据，但至少应该有一个播放器UI来展示演示效果。',
    context: '用户实际部署后反馈：电影无法播放可以理解，但连播放器界面都没有，体验很差。',
    suggestedFix: '新增 PlayerPage 组件，包含：模拟播放器UI、进度条、播放/暂停控制、音量控制、全屏按钮、电影信息面板。使用电影背景图作为模拟画面。',
    status: 'resolved',
    tags: ['player', 'ux', 'user-feedback'],
  },
  {
    id: 'fb-010',
    timestamp: new Date('2026-05-12T14:05:00Z'),
    category: 'ui_ux',
    severity: 'high',
    title: '网站缺少数据状态说明，用户不知道当前是演示模式',
    description: '网站上线后，用户不知道当前使用的是占位数据，会误以为是一个真实的电影网站。应该在显眼位置告知用户当前的数据状态和功能限制。',
    context: '用户反馈：既然要做网站，应该让用户清楚当前做到什么程度了。',
    suggestedFix: '在页面顶部添加演示模式横幅（DemoBanner），告知用户当前为演示模式，使用占位数据。可关闭但刷新后重新显示。',
    status: 'resolved',
    tags: ['demo-mode', 'ux', 'transparency', 'user-feedback'],
  },
  {
    id: 'fb-011',
    timestamp: new Date('2026-05-12T14:10:00Z'),
    category: 'improvement',
    severity: 'medium',
    title: '缺少项目进度报告和改进路线图',
    description: '开发完成后没有输出项目进度报告，用户不清楚：当前实现了哪些功能、还差哪些功能、后续改进方向是什么、需求者的潜在需求是什么。',
    context: '用户反馈：做完之后应该说明当前做到什么程度，后续可以提建议，真正做成电影网站还差哪几步。',
    suggestedFix: '生成项目进度报告文档，包含：已完成功能清单、未完成功能清单、改进路线图、需求者潜在需求分析。',
    status: 'resolved',
    tags: ['documentation', 'roadmap', 'user-feedback', 'project-management'],
  },
];

/**
 * 反馈管理器
 */
export class FeedbackManager {
  private feedbacks: FeedbackItem[] = [...initialFeedback];

  /**
   * 添加新反馈
   */
  addFeedback(feedback: Omit<FeedbackItem, 'id' | 'timestamp'>): FeedbackItem {
    const item: FeedbackItem = {
      ...feedback,
      id: `fb-${String(this.feedbacks.length + 1).padStart(3, '0')}`,
      timestamp: new Date(),
    };
    this.feedbacks.push(item);
    return item;
  }

  /**
   * 获取所有反馈
   */
  getAll(): FeedbackItem[] {
    return [...this.feedbacks];
  }

  /**
   * 按分类筛选
   */
  getByCategory(category: FeedbackCategory): FeedbackItem[] {
    return this.feedbacks.filter(f => f.category === category);
  }

  /**
   * 按严重程度筛选
   */
  getBySeverity(severity: FeedbackItem['severity']): FeedbackItem[] {
    return this.feedbacks.filter(f => f.severity === severity);
  }

  /**
   * 获取开放问题
   */
  getOpen(): FeedbackItem[] {
    return this.feedbacks.filter(f => f.status === 'open');
  }

  /**
   * 更新反馈状态
   */
  updateStatus(id: string, status: FeedbackItem['status']): void {
    const item = this.feedbacks.find(f => f.id === id);
    if (item) {
      item.status = status;
    }
  }

  /**
   * 生成反馈报告
   */
  generateReport(): string {
    const lines: string[] = [
      '# AI Dev Platform - 开发反馈报告',
      '',
      `生成时间: ${new Date().toISOString()}`,
      `总反馈数: ${this.feedbacks.length}`,
      `开放问题: ${this.getOpen().length}`,
      '',
      '## 按严重程度分布',
      ...['critical', 'high', 'medium', 'low'].map(sev => {
        const count = this.getBySeverity(sev as FeedbackItem['severity']).length;
        return `- ${sev}: ${count}`;
      }),
      '',
      '## 按分类分布',
      ...this.getCategoryDistribution(),
      '',
      '## 详细反馈',
      '',
      ...this.feedbacks.map(f => [
        `### ${f.id}: ${f.title}`,
        `- 分类: ${f.category}`,
        `- 严重程度: ${f.severity}`,
        `- 状态: ${f.status}`,
        `- 描述: ${f.description}`,
        f.suggestedFix ? `- 建议修复: ${f.suggestedFix}` : '',
        f.tags.length > 0 ? `- 标签: ${f.tags.join(', ')}` : '',
        '',
      ].join('\n')),
    ];

    return lines.join('\n');
  }

  /**
   * 导出为 JSON
   */
  toJSON(): string {
    return JSON.stringify(this.feedbacks, null, 2);
  }

  private getCategoryDistribution(): string[] {
    const dist = new Map<string, number>();
    for (const f of this.feedbacks) {
      dist.set(f.category, (dist.get(f.category) || 0) + 1);
    }
    return Array.from(dist.entries()).map(([cat, count]) => `- ${cat}: ${count}`);
  }
}
