import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ViewTransitions } from 'next-view-transitions';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { NavigationDirection } from '@/components/layout/NavigationDirection';

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
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavigationDirection />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
