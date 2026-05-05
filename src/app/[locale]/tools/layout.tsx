import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "tools", "/tools");
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
