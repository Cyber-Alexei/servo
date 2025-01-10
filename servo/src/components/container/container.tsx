export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="max-w-[1140px] min-w-[300px] px-[10px] w-full mx-auto">
      {children}
    </div>
  );
};
