import { NavItem } from "@/types/nav";
import { LayoutDashboard, Image, Layers, ImageDown, Settings } from "lucide-react";

export const navItems: NavItem[] = [
    {
        title: "ダッシュボード",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "画像生成",
        href: "/dashboard/tools/image-generator",
        icon: Image,
    },
    {
        title: "背景削除",
        href: "/dashboard/tools/remove-background",
        icon: Layers,
    },
    {
        title: "画像最適化",
        href: "/dashboard/tools/image-optimizer",
        icon: ImageDown,
    },
    {
        title: "設定",
        href: "/dashboard/settings",
        icon: Settings,
    },
];
