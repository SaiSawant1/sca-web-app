"use client";
interface CurrentViewProps {
  children: React.ReactNode;
}
export const CurrentView = ({ children }: CurrentViewProps) => {
  return (<>{children}</>);
};
