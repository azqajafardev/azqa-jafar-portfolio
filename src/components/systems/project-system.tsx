import { SystemPanel } from "./system-panel";
import { SecurityScene } from "./security-scene";
import { ResearchScene } from "./research-scene";
import { MonitoringScene } from "./monitoring-scene";
import { CampusScene } from "./campus-scene";
import { ImagingScene } from "./imaging-scene";
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
      <SecurityScene />
    ) : index === 1 ? (
      <ResearchScene />
    ) : index === 2 ? (
      <MonitoringScene />
    ) : index === 3 ? (
      <CampusScene />
    ) : (
      <ImagingScene />
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
