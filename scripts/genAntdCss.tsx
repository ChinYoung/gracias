// scripts/genAntdCss.tsx
import React from "react";
import fs from "fs";
import { extractStyle } from "@ant-design/static-style-extract";
import { ConfigProvider, theme } from "antd";

const outputPath = "./public/antd.min.css";

const css = extractStyle((node) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      {node}
    </ConfigProvider>
  );
});

fs.writeFileSync(outputPath, css);
