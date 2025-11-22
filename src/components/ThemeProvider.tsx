"use client";

import { ConfigProvider, theme } from "antd";
import { FC, PropsWithChildren, useEffect, useState } from "react";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(true);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <ConfigProvider
      theme={
        isDark
          ? {
              algorithm: theme.darkAlgorithm,
            }
          : {
              algorithm: theme.defaultAlgorithm,

              token: {
                colorBgContainer: "#f8f9fa",
              },
            }
      }
    >
      {children}
    </ConfigProvider>
  );
};
