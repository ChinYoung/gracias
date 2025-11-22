"use client";

import { TStrapiMenu } from "@/types/strapi.type";
import { ConfigProvider, theme, Typography } from "antd";
import Card from "antd/es/card/Card";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { ThemeProvider } from "./ThemeProvider";

const MenuItem: FC<{ menu: TStrapiMenu; prefix: string }> = ({
  menu,
  prefix,
}) => {
  const { Text } = Typography;
  const thisPath =
    menu.path === "/" ? "/" : `${prefix ? prefix : "/"}${menu.path}/`;
  return (
    <div className="px-2 py-1 hover:scale-110 w-full h-fit rounded-lg cursor-pointer">
      <Link href={thisPath} className="whitespace-nowrap">
        <Text>{menu.name}</Text>
      </Link>
    </div>
  );
};

const RootMenu: FC<{ menu: TStrapiMenu }> = ({ menu }) => {
  return (
    <div key={menu.documentId} className="relative w-fit group">
      {/* root */}
      <MenuItem menu={menu} prefix="/" />
      {/* sub paths */}
      {menu.children && menu.children.length > 0 && (
        <div className="group absolute left-0 top-full invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-discrete transition-all duration-800">
          <Card size="small">
            {menu.children.map((child) => (
              <div
                key={child.documentId}
                className="border-b border-gray-300 last:border-none"
              >
                {renderChildMenu(child, `/${menu.path}/`)}
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
};

function renderChildMenu(menu: TStrapiMenu, prefix: string) {
  return (
    <div key={menu.documentId} className="flex w-full">
      {/* root */}
      <div>
        <MenuItem menu={menu} prefix={prefix} />
      </div>
      {/* sub paths */}
      <div className="w-1/2">
        {menu.children &&
          menu.children.length > 0 &&
          menu.children.map((child) => (
            <div key={child.documentId}>
              {renderChildMenu(child, `${prefix ? prefix : "/"}${menu.path}/`)}
            </div>
          ))}
      </div>
    </div>
  );
}

export const RootMenus: FC<{ menus: TStrapiMenu[] }> = ({ menus }) => {
  const [isSticky, setIsSticky] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function scrollHandler() {
      if (!divRef.current) return;
      const rect = divRef.current?.getBoundingClientRect();
      setIsSticky(rect.top <= 0);
    }
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <ThemeProvider>
      <div
        className="w-full sticky top-0 pt-2 pb-1 flex gap-2 justify-start  px-10 bg-[var(--background)]"
        ref={divRef}
      >
        {isSticky ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 shadow-2xl"></div>
        ) : null}
        {menus
          .filter((i) => !i.parent)
          .sort((a, b) => b.priority - a.priority)
          .map((menu) => (
            <RootMenu key={menu.documentId} menu={menu} />
          ))}
      </div>
    </ThemeProvider>
  );
};
