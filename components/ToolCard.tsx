import { MCPTool, MCPToolParameter } from "@/types/mcp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ToolCardProps {
  tool: MCPTool;
}

// 渲染参数类型
const renderParameterType = (param: MCPToolParameter): string => {
  if (param.enum) {
    return `enum: ${param.enum.join(" | ")}`;
  }
  if (param.type === "array" && param.items) {
    return `${param.items.type}[]`;
  }
  return param.type;
};

export function ToolCard({ tool }: ToolCardProps) {
  const properties = tool.inputSchema.properties || {};
  const required = tool.inputSchema.required || [];
  const hasParameters = Object.keys(properties).length > 0;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-bold text-primary">
            {tool.name}
          </CardTitle>
          <Badge variant="secondary" className="shrink-0">
            工具
          </Badge>
        </div>
        {tool.description && (
          <CardDescription className="text-base mt-2">
            {tool.description}
          </CardDescription>
        )}
      </CardHeader>
      
      {hasParameters && (
        <>
          <Separator />
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3 text-sm text-muted-foreground">
              参数列表
            </h4>
            <div className="space-y-3">
              {Object.entries(properties).map(([paramName, param]) => (
                <div
                  key={paramName}
                  className="bg-muted/50 rounded-lg p-3 space-y-1"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-sm font-mono font-semibold text-foreground">
                      {paramName}
                    </code>
                    <Badge variant="outline" className="text-xs">
                      {renderParameterType(param)}
                    </Badge>
                    {required.includes(paramName) && (
                      <Badge variant="destructive" className="text-xs">
                        必需
                      </Badge>
                    )}
                  </div>
                  {param.description && (
                    <p className="text-sm text-muted-foreground">
                      {param.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
