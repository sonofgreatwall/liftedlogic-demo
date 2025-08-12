import type { ReactNode } from "react";
import {
  Header,
  Footer
} from "../components"
import { Stack, Box, Container } from "@mui/material";
import { styled } from '@mui/material/styles';

interface PageLayoutProps {
  children: ReactNode;
}

const StyledPageLayout = styled(Stack)({
  height: '100vh',
  justifyContent: 'space-between',
});

const StyledContentLayout = styled(Box)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper
}));

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <StyledPageLayout>
      <Header />
      <StyledContentLayout>
        <Container>
          {children}
        </Container>
      </StyledContentLayout>
      <Footer />
    </StyledPageLayout>
  );
}