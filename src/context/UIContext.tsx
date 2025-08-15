import { createContext, useContext, useState, type ReactNode } from "react";
interface UIContextTypes {
  search: string;
  setSearch: (x: string) => void;
  setTotalJobListing: (x: number) => void;
  totalJobListing: number;
}

const UIContext = createContext<UIContextTypes | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState<string>("");
  const [totalJobListing, setTotalJobListing] = useState<number>(0);
  return (
    <UIContext.Provider value={{ search, setSearch, setTotalJobListing, totalJobListing }}>
      {children}
    </UIContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useUIContext() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export default UIContext;
