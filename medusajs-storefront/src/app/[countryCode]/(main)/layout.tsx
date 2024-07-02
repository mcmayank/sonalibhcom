import Footer from "@modules/layout/templates/footer";
import Nav from "@modules/layout/templates/nav";
import { fetchData } from "@lib/fetchData";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Image from "next/image";

// Initialize Storyblok
storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000";

interface PageLayoutProps {
  children: React.ReactNode;
  story: {
    name: string;
    content: any; // Adjust according to your content structure
  } | null;
}

export async function generateMetadata({ params }: { params: { countryCode: string } }) {
  const { countryCode } = params || {};
  const slug = countryCode ? `home` : "home";
  const data = await fetchData(slug);

  return {
    title: data ? data.story.name : "No story found",
    metadataBase: new URL(BASE_URL),
  };
}

export default async function PageLayout({ children, params }: { children: React.ReactNode; params: { countryCode: string } }) {
  // const { countryCode } = params || {};
  // const slug = countryCode ? `home` : "home";
  // const data = await fetchData(slug);

  const config = "site-config"
  const nav = await fetchData(config)
  // const data = await fetchData(slug);
  const story = nav ? nav.story : null;
  let brandLogo = story.content.header_logo.filename
  let navItems = story.content.header_nav
  return (
    <>
      <Nav logo={story.content.header_logo} navItems = {navItems} />
      {children}
      <Footer />
    </>
  );
}