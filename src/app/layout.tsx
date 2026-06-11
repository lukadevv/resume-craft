import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Resume Craft - Professional Resume Builder',
  description:
    'Create professional, customizable resumes with multiple templates. Export to PDF, DOCX, and more.',
  keywords: ['resume', 'cv', 'builder', 'job', 'career'],
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3ECF8E',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="#3ECF8E"
            height={3}
            showSpinner={false}
            shadow="0 0 10px #3ECF8E,0 0 5px #3ECF8E"
            crawlSpeed={200}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
