import { SystemPanel } from "./system-panel";
import { MultiAgentGraph } from "./multi-agent-graph";
import { RAGPipeline } from "./rag-pipeline";
import { TelemetryPanel } from "./telemetry-panel";
import { KnowledgeGraph } from "./knowledge-graph";
import { ResearchPipeline } from "./research-pipeline";
import { systemPresentation } from "../../data/system-visuals";
const kinds = [
  "command-system",
  "retrieval-system",
  "monitor-system",
  "knowledge-system",
  "imaging-system",
];
export function ProjectSystem({ index }: { index: number }) {
  const visual =
    index === 0 ? (
      <MultiAgentGraph />
    ) : index === 1 ? (
      <RAGPipeline />
    ) : index === 2 ? (
      <TelemetryPanel />
    ) : index === 3 ? (
      <KnowledgeGraph />
    ) : (
      <ResearchPipeline />
    );
  return (
    <SystemPanel
      title={systemPresentation[index].mode}
      number={index}
      kind={kinds[index]}
    >
      {visual}
    </SystemPanel>
  );
}
