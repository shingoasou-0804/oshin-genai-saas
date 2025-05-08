import PageContainer from "@/components/dashboard/page-container";
import PageHeader from "@/components/dashboard/page-header";
import { tools, ToolType } from "@/config/tool";
import { notFound } from "next/navigation";

const ToolPage = async ({ params }: { params: Promise<{ tool: string }> }) => {
    const toolType = (await params).tool as ToolType;
    const tool = tools[toolType];
    if (!tool) {
        notFound();
    }

    const ToolComponent = tool.component;
    return (
        <PageContainer>
            <PageHeader title={tool.title} description={tool.description} />
            <div>
                <ToolComponent />
            </div>
        </PageContainer>
    );
};

export default ToolPage;
