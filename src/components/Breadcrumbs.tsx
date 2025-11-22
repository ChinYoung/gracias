"use client";

import { TStrapiMenu } from "@/types/strapi.type";
import { usePathname } from "next/navigation";
import { FC } from "react";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb as AntBreadcrumb } from "antd";

export const Breadcrumbs: FC<{ menus: TStrapiMenu[] }> = ({
  menus: _menus,
}) => {
  const pathname = usePathname();

  const formatBreadcrumbName = (path: string) => {
    const nameMap: Record<string, string> = {
      home: "首页",
      blog: "博客",
      image: "图片",
      game: "游戏",
      article: "文章",
      "[id]": "详情", // 处理动态路由
    };

    return nameMap[path] || path;
  };

  const breadcrumbItems = [
    {
      title: (
        <Link href="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...pathname
      .split("/")
      .filter((path) => path)
      .map((path, index, array) => {
        const href = "/" + array.slice(0, index + 1).join("/");
        const isLast = index === array.length - 1;

        return {
          title: isLast ? (
            <span>{formatBreadcrumbName(path)}</span>
          ) : (
            <Link href={href}>{formatBreadcrumbName(path)}</Link>
          ),
        };
      }),
  ];

  return <AntBreadcrumb items={breadcrumbItems} className="mb-4" />;
};
