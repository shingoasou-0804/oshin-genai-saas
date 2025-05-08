import ImageGenerator from "@/components/dashboard/tools/image-generator";
import ImageOptimizer from "@/components/dashboard/tools/image-optimizer";
import BackgroundRemover from "@/components/dashboard/tools/background-remover";

export const tools = {
    "image-generator": {
        title: "画像生成",
        description: "AIを使用してお好みの画像を生成します",
        component: ImageGenerator,
    },
    "remove-background": {
        title: "背景削除",
        description: "画像の背景を削除します",
        component: BackgroundRemover,
    },
    "image-optimizer": {
        title: "画像最適化",
        description: "AIを使用して画像を最適化します",
        component: ImageOptimizer,
    },
}

export type ToolType = keyof typeof tools;
