import { HomeHeader } from "@/components/header/home_header";

export default function LandingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // JSX
  return (
    <main>
      <HomeHeader />
      {children}
    </main>
  );
}
