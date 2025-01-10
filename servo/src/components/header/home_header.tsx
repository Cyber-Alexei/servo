"use client";
import { Container } from "@/components/container/container";

export const HomeHeader = ({ admin }: { admin?: boolean }): JSX.Element => {
  // JSX
  return (
    <header className="w-full flex text-white h-[60px] text-2xl font-extrabold items-center bg-purple-500">
      <Container>
        <div className="flex justify-between items-end">
          <p
            className="cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            Servo
          </p>
          {admin && (
            <p className="text-xl cursor-pointer">Adminitrator panel</p>
          )}
        </div>
      </Container>
    </header>
  );
};
