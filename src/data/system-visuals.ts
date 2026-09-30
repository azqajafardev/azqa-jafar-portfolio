export type DiagramNode = {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
  kind?: "core" | "satellite";
  eyebrow?: string;
};
export type DiagramEdge = { from: string; to: string };
export const systemPresentation = [
  {
    label: "Agentic security",
    category: "MULTI-AGENT AI × SECURITY",
    name: "ENTERPRISE AI SECURITY",
    subtitle: "Desktop intelligence, coordinated.",
    mode: "MULTI-AGENT COMMAND GRAPH",
  },
  {
    label: "Evidence RAG",
    category: "AGENTIC RAG × RESEARCH",
    name: "RESEARCHLENS AI",
    subtitle: "Research answers with a traceable foundation.",
    mode: "RETRIEVAL LABORATORY",
  },
  {
    label: "AI monitoring",
    category: "AI × SYSTEM OBSERVABILITY",
    name: "SYSTEM MONITOR",
    subtitle: "A clearer view of technical signals.",
    mode: "TELEMETRY CONSOLE",
  },
  {
    label: "Knowledge AI",
    category: "RAG × KNOWLEDGE SYSTEM",
    name: "UNIGUIDE AI",
    subtitle: "Institutional knowledge, connected.",
    mode: "KNOWLEDGE MAP",
  },
  {
    label: "Deep learning",
    category: "DEEP LEARNING × MEDICAL IMAGING",
    name: "MPAFNET",
    subtitle:
      "3D multi-plane Alzheimer’s classification · final year research project.",
    mode: "MULTI-PLANE RESEARCH",
  },
];
export const securityNodes: DiagramNode[] = [
  {
    id: "input",
    label: "Security input",
    eyebrow: "01 / INPUT",
    x: 50,
    y: 9,
    detail:
      "Security context provides the starting point for threat analysis and vulnerability assessment.",
  },
  {
    id: "orchestrator",
    label: "AI orchestrator",
    eyebrow: "02 / COORDINATE",
    x: 50,
    y: 31,
    kind: "core",
    detail: "LangChain and LangGraph coordinate the multi-agent workflow.",
  },
  {
    id: "analysis",
    label: "Multi-agent analysis",
    eyebrow: "ANALYZE",
    x: 22,
    y: 56,
    detail:
      "Agent-driven analysis supports threat analysis and vulnerability assessment. This map does not specify an agent count.",
  },
  {
    id: "context",
    label: "RAG / vector context",
    eyebrow: "RETRIEVE",
    x: 50,
    y: 56,
    detail:
      "Retrieval supplies relevant security context to the reasoning workflow.",
  },
  {
    id: "tools",
    label: "MCP / tools",
    eyebrow: "CONNECT",
    x: 78,
    y: 56,
    detail: "MCP connects the AI workflow to external tools and services.",
  },
  {
    id: "api",
    label: "External APIs",
    eyebrow: "INTEGRATE",
    x: 88,
    y: 85,
    kind: "satellite",
    detail:
      "External APIs extend the information and capabilities available to the platform.",
  },
  {
    id: "insight",
    label: "Security insight",
    eyebrow: "03 / OUTPUT",
    x: 50,
    y: 89,
    kind: "core",
    detail:
      "Context-aware analysis is presented through the Flutter desktop application.",
  },
];
export const securityEdges: DiagramEdge[] = [
  { from: "input", to: "orchestrator" },
  { from: "orchestrator", to: "analysis" },
  { from: "orchestrator", to: "context" },
  { from: "orchestrator", to: "tools" },
  { from: "analysis", to: "insight" },
  { from: "context", to: "insight" },
  { from: "tools", to: "insight" },
  { from: "tools", to: "api" },
];
export const retrievalStages = [
  {
    name: "Ingest",
    description: "Research PDFs enter the document preparation workflow.",
  },
  {
    name: "Chunk",
    description: "Documents are divided into retrievable passages.",
  },
  {
    name: "Embed",
    description: "Passages are represented for semantic retrieval.",
  },
  {
    name: "Retrieve",
    description: "Relevant source passages are selected from the vector space.",
  },
  {
    name: "Rerank",
    description: "Candidate evidence is reorganized for relevance.",
  },
  {
    name: "Ground",
    description: "Selected source context is prepared for generation.",
  },
  {
    name: "Generate",
    description:
      "An answer is grounded in the retrieved evidence, with source traceability.",
  },
];
export const knowledgeNodes: DiagramNode[] = [
  {
    id: "university",
    label: "University knowledge",
    eyebrow: "INSTITUTIONAL CONTEXT",
    x: 50,
    y: 48,
    kind: "core",
    detail:
      "Structured institutional information is the knowledge source for UniGuide AI.",
  },
  {
    id: "admissions",
    label: "Admissions",
    eyebrow: "KNOWLEDGE / 01",
    x: 17,
    y: 23,
    detail:
      "Admissions information is one of the supported institutional knowledge categories.",
  },
  {
    id: "departments",
    label: "Departments",
    eyebrow: "KNOWLEDGE / 02",
    x: 50,
    y: 10,
    detail:
      "Department information provides relevant context for student questions.",
  },
  {
    id: "courses",
    label: "Courses",
    eyebrow: "KNOWLEDGE / 03",
    x: 83,
    y: 23,
    detail:
      "Course-related information can be retrieved as context for a student query.",
  },
  {
    id: "fees",
    label: "Fees",
    eyebrow: "KNOWLEDGE / 04",
    x: 78,
    y: 81,
    detail:
      "Fee-related questions are grounded in supplied institutional information.",
  },
  {
    id: "policies",
    label: "Policies",
    eyebrow: "KNOWLEDGE / 05",
    x: 22,
    y: 81,
    detail:
      "Institutional policies are part of the documented knowledge scope.",
  },
];
export const imagingSteps = [
  {
    name: "Preprocessing",
    detail: "Prepare complementary views of 3D brain-imaging data.",
  },
  {
    name: "Feature extraction",
    detail: "Learn representations from the prepared imaging views.",
  },
  {
    name: "Multi-plane integration",
    detail:
      "Bring complementary views into the custom MPAFNet research workflow. This visual is conceptual, not a claim about an unreported fusion implementation.",
  },
  {
    name: "MPAFNet",
    detail:
      "A custom deep-learning workflow developed as a final year research project.",
  },
  {
    name: "Classification / evaluation",
    detail:
      "Train and evaluate the experimental classification model. No clinical approval or patient prediction is implied.",
  },
];
