import type { ReactNode } from "react";
import {
  Header,
  Footer
} from "../components"
import { Stack } from "@mui/material";
import { styled } from '@mui/material/styles';

interface PageLayoutProps {
  children: ReactNode;
}

const StyledPageLayout = styled(Stack)(({ theme }) => ({
  height: '100vh',
  justifyContent: 'space-between',
}));

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <StyledPageLayout>
      <Header />
      {children}
      <Footer />
    </StyledPageLayout>
  );
}