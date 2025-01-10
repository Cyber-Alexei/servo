import { HomeHeader } from "@/components/header/home_header";

export default function AuthorizationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <HomeHeader />
      {children}
    </main>
  );
}
