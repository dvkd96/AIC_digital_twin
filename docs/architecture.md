# Digital Twin Architecture

```mermaid
flowchart TB
  P[Presentation\nOperations | Investigation | Management]
  D[DECIDE\nExplain | Compare | Recommend | Counterfactual]
  A[ASSESS\nPredict | Detect | Estimate confidence | Priority queue]
  U[UNDERSTAND\nSignal ingestion | Soft sensing]
  T[TWIN CORE\n14-station graph | Simulation | Ground truth]
  L[LEARN\nOutcome validation | Metrics]
  T --> U --> A --> D --> P
  T --> L --> A
```

The normal path is deliberately directional. Learn is the only backward edge because it is the only layer allowed to update confidence from resolved outcomes.

## Boundaries

- Twin Core owns station configuration, evolving state, and ground truth.
- Understand owns the production-adapter seam and hidden-state inference.
- Assess owns risk, confidence, impact, and ranking.
- Decide owns legible reasons, candidate actions, and lightweight projections.
- Presentation reads the shared store and dispatches view-level selections.
