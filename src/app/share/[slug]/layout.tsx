import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Static metadata since all shares show the same demo
  const title = "My 2024 Wrapped on X";
  const description = "@builder's year in review • The Builder Era • 3,847 posts";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://xeet-wrapped.vercel.app";
  const url = `${baseUrl}/share/${slug}`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Xeet Wrapped",
      type: "website",
      // Uses the generated opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // Uses the generated opengraph-image.tsx
    },
  };
}

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

