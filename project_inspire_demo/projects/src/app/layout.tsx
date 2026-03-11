import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '任智韬 | AI产品经理',
    template: '%s | 任智韬',
  },
  description:
    'AI产品经理 | 专注于AI产品探索、方案设计与快速原型验证。擅长MES系统AI分析、知识图谱构建、模型微调与AI Agent开发。',
  keywords: [
    'AI产品经理',
    '任智韬',
    'Riley Ren',
    'AI Product Manager',
    '知识图谱',
    'AI Agent',
    'Chat BI',
    '模型微调',
    '提示词工程',
    'Vibe Coding',
  ],
  authors: [{ name: '任智韬', url: 'mailto:riley013@163.com' }],
  generator: 'Coze Code',
  openGraph: {
    title: '任智韬 | AI产品经理',
    description:
      'AI产品经理 | 专注于AI产品探索、方案设计与快速原型验证。擅长MES系统AI分析、知识图谱构建、模型微调与AI Agent开发。',
    type: 'website',
    locale: 'zh_CN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {isDev && <Inspector />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
