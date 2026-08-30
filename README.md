# Digital Twin

Digital Twin is a browser-based manufacturing intelligence prototype built for AI Reimagination Made Real and innovation-focused hackathon evaluation. It helps plant teams move from noisy, incomplete factory data to a ranked, explainable operational decision.

The core demonstration is decision-making under uncertainty. In the prototype, station `S11` shows higher raw risk, but station `S2` is ranked first because it has stronger measurement confidence and greater downstream impact. The system therefore prioritizes the issue most worth acting on, not simply the issue that looks most severe.

## Project Summary

### The problem

Manufacturing teams often operate with partial visibility. Some stations are fully instrumented, some are only partially observed, and others must be understood indirectly through neighboring behavior. In that setting, teams struggle to answer four practical questions:

- What needs attention first?
- Why is this happening?
- What should we do next?
- Can we trust the recommendation?

### Our solution

Digital Twin combines simulated plant state, soft sensing, explainable ranking, action recommendation, and outcome-based learning in one workflow. It treats the production line as a connected system rather than a collection of isolated alarms.

### What makes it valuable

- It ranks issues using `risk × confidence × impact`.
- It distinguishes measured signals from inferred signals.
- It explains why one station outranks another.
- It supports action comparison and lightweight counterfactual simulation.
- It shows how targeted sensing upgrades can improve confidence in partially observed stations.

## Competition Relevance

This project was designed as a working prototype for competition and hackathon review. It focuses on three qualities judges usually look for:

- a clear real-world problem,
- a technically coherent solution,
- and an understandable demo story with visible product value.

The prototype uses a 14-station, 3-zone demo slice for clarity and presentation speed. The station graph and scoring flow are config-driven, so scaling toward a 30 to 50 station scenario is an extension of the model, not a redesign of the architecture.

## Key Features

- Live station graph showing connected factory activity
- Priority queue driven by `risk × confidence × impact`
- Explainable breakdown of why a signal is ranked where it is
- Action recommendation with projected throughput improvement
- Investigation view for upstream causes and downstream exposure
- Retrofit simulation showing how low-cost sensing improves confidence
- Learning view showing resolved outcomes, precision, false-alert rate, and lead time

## Architecture

The prototype follows a layered decision loop:

`Twin Core → Understand → Assess → Decide → Presentation`

with a feedback edge:

`Twin Core → Learn → Assess`

### Layer responsibilities

- `Twin Core`: station graph, simulation state, scripted events, ground-truth-style behavior
- `Understand`: signal normalization and soft sensing for incomplete observability
- `Assess`: risk scoring, confidence estimation, impact weighting, and ranking
- `Decide`: explanation, action comparison, recommendation, and counterfactual projection
- `Learn`: outcome validation and model-health metrics
- `Presentation`: Operations, Investigation, and Management views built on one shared snapshot

Architecture reference: [docs/architecture.md](docs/architecture.md)  
Project description: [docs/project-description.md](docs/project-description.md)

## Demo Walkthrough

### 1. Operations

The Operations view establishes that the line is live and partially observed. It shows the station graph, active signals, the priority queue, and a justification panel for the selected issue.

This is where the main story appears: `S11` has higher raw risk, but `S2` is ranked first because the system has stronger evidence and higher operational consequence for `S2`.

### 2. Decision support

After selecting `S2`, the user can compare candidate actions and simulate the recommended intervention. The projection shows expected throughput improvement, helping the system move beyond alerting into action support.

### 3. Investigation

The Investigation view traces candidate causes for the downstream quality event at `S13`. It also shows forward traceability through potentially exposed vehicles.

This view also demonstrates one of the most important ideas in the prototype: the twin remains useful even when instrumentation is incomplete. For `S11`, the interface shows that installing a low-cost vibration sensor during the next maintenance window would improve confidence from `42%` to `81%`.

### 4. Management

The Management view closes the loop. It shows which alerts resolved correctly, which did not, and how those outcomes affect trust in the system through precision, false-alert rate, and lead-time metrics.

Demo outline: [docs/demo-script.md](docs/demo-script.md)

## Why The Ranking Logic Matters

Many operational systems sort work by severity alone. That can over-prioritize noisy or weakly observed signals and waste operator attention. This project instead scores issues using:

`Risk × Confidence × Impact`

That means the system asks:

- How severe is the issue?
- How much do we trust the signal?
- If it is real, how much will it affect production?

This makes the ranking more practical for real decision-making.

## Technical Implementation

This repository contains a modular front-end prototype built with React and Vite. The codebase is organized to keep the simulation, signal reasoning, ranking, recommendation, and learning logic clearly separated.

```text
src/
  twin-core/      station graph and simulation engine
  understand/     signal ingestion and soft sensing
  assess/         prediction ranking
  decide/         recommendations, explanations, and projections
  learn/          outcome validation and metrics tracking
  store/          shared snapshot for all views
  shared/         shared signal types
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Submission Materials

- Architecture overview: [docs/architecture.md](docs/architecture.md)
- Demo script: [docs/demo-script.md](docs/demo-script.md)
- Full project description: [docs/project-description.md](docs/project-description.md)

Add your final demo video link here before submission.

## Current Prototype Scope

The current submission is a proof-of-concept prototype. It includes:

- simulated production behavior,
- browser-based visualization,
- transparent weighted scoring,
- and a lightweight learning loop.

It does not yet include:

- live PLC, MES, or ERP integration,
- persistent storage,
- enterprise authentication or approval workflows,
- or plant-specific model calibration.

## Roadmap

- Expand station coverage from demo slice to larger plant scenarios
- Connect live industrial data sources
- Add persistent event and outcome history
- Calibrate models using plant-specific historical data
- Introduce operator approval and maintenance workflow integration
- Support multi-line and multi-site deployment

## Team

Add team member names, roles, and affiliations here before final submission.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
