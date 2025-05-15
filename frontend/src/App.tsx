import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/themeProvider";
import Congratulations from "./pages/Congratulations";
import AdminPanel from "./pages/AdminPanel";
import EventDetail from "./pages/EventDetail";
import Header from "./components/Header";
import Home from "./pages/Home";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./pages/Signup";
import ThemedToaster from "./components/ThemedToaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ThemedToaster />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route
                path="/admin"
                element={
                  // <PrivateRoute>
                  <AdminPanel />
                  // </PrivateRoute>
                }
              />
              <Route path="/congratulations" element={<Congratulations />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
