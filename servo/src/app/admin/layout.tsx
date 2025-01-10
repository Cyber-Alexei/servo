import { HomeHeader } from "@/components/header/home_header";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <HomeHeader admin={true} />
      {children}
    </main>
  );
}
