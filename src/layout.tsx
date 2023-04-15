import { Header } from "./components/Header";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen overflow-hidden bg-slate-800 text-slate-200">
      <Header />
      {children}
    </div>
  );
};
