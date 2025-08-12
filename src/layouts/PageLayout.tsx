import type { ReactNode } from "react";
import {
  Header,
  Footer
} from "../components"
import { Box, Container } from "@mui/material";
import { styled } from '@mui/material/styles';

interface PageLayoutProps {
  children: ReactNode;
}

const StyledContentLayout = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 54px)',
  backgroundColor: theme.palette.background.paper,
}));

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <StyledContentLayout>
        <Container sx={{ marginTop: '54px' }}>
          {children}
        </Container>
      </StyledContentLayout>
      <Footer />
    </>
  );
}