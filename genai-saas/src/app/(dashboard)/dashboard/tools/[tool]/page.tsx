import { tools } from "@/config/tool";

const ToolPage = () => {
    const tool = tools["image-generator"]
    return (
        <div>
            <h2>{tool.title}</h2>
        </div>
    );
};

export default ToolPage;
