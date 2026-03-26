import { AuthContextProvider } from "../week-10/_utils/auth-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}