import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainInterfacePage from "./pages/MainInterfacePage";
import SearchPage from "./pages/SearchPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainInterfacePage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* For detail pages, typically you'd use dynamic routes like /playlist/:id */}
          {/* For this setup, using static paths as examples. */}
          <Route path="/playlist-detail" element={<PlaylistDetailPage />} />
          <Route path="/album-detail" element={<AlbumDetailPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;