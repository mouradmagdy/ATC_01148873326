import { Toaster } from "react-hot-toast";
import { useTheme } from "./themeProvider";

function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 5000 },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: theme === "light" ? "#fff" : "#1f2937",
          color: theme === "light" ? "#374151" : "#f3f4f6",
        },
      }}
    />
  );
}
export default ThemedToaster;
