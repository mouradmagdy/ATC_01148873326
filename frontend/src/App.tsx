import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import AppLayout from "./components/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemedToaster from "./components/ThemedToaster";
import { AuthContextProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { lazy, Suspense } from "react";
import HomeSkeleton from "./components/HomeSkeleton";

const Home = lazy(() => import("./pages/Home"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Congratulations = lazy(() => import("./pages/Congratulations"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

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
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <ThemedToaster />
          <BrowserRouter>
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            <Routes>
              <Route element={<AppLayout />}>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<HomeSkeleton />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <Suspense fallback={<HomeSkeleton />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AdminPanel />
                    </PrivateRoute>
                  }
                />
                <Route path="/congratulations" element={<Congratulations />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
            {/* </Suspense> */}
          </BrowserRouter>
        </QueryClientProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
