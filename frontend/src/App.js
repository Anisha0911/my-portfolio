import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import NotFound from "@/pages/NotFound";
import { Navbar } from "@/components/Navbar";
import { CustomCursor, ScrollProgress, ScrollToTop, PageLoader } from "@/components/Chrome";
import { useLenis } from "@/hooks/useLenis";

function App() {
  useLenis();
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="App">
        <BrowserRouter>
          <PageLoader />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <ScrollToTop />
          <Toaster position="bottom-center" richColors />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
