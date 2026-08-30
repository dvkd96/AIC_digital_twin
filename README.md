# Digital Twin

Digital Twin is a browser-based prototype for manufacturing decision support. It takes incomplete factory data and turns it into a ranked, explainable answer to one question: what should we act on right now?

Example from the demo: station `S11` has higher raw risk, but `S2` is ranked first because the evidence behind it is stronger and it matters more to the line. The system optimizes for the best decision, not the loudest alarm.

## The problem

Most lines are not evenly instrumented. Some stations have full sensor coverage, some are partially observed, and a few can only be reasoned about indirectly through neighboring signals. This makes it hard to answer:

- What needs attention first?
- Why is this happening?
- What should we do about it?
- Can we trust the answer?

## How it works

Digital Twin combines a simulated plant state, soft sensing for poorly observed stations, explainable ranking, action recommendations, and outcome tracking in one workflow. The line is treated as a connected system, not a set of independent alarms.

The ranking logic:

```
Priority = Risk x Confidence x Impact
```

A high-risk reading built on thin, inferred evidence can rank below a lower-risk reading backed by strong, direct measurement. That is why `S2` outranks `S11` in the demo.

The prototype runs on a 14-station, 3-zone slice. The station graph and scoring logic are config-driven, so extending it toward 30 to 50 stations means adding stations, not rebuilding the system.

## Features

- Live station graph of factory activity
- Priority queue ranked by risk x confidence x impact
- Explanation panel showing why a signal is ranked where it is
- Action recommendations with a projected throughput effect
- Investigation view for upstream causes and downstream exposure
- Retrofit simulation showing how a low-cost sensor would raise confidence at a poorly observed station
- Learning view tracking resolved outcomes, precision, false-alert rate, and lead time

## Architecture

```
Twin Core -> Understand -> Assess -> Decide -> Presentation
                 ^                       |
                 +--------- Learn -------+
```

- `Twin Core`: station graph, simulation state, scripted events, ground-truth behavior
- `Understand`: signal normalization and soft sensing
- `Assess`: risk scoring, confidence estimation, impact weighting, ranking
- `Decide`: explanation, action comparison, recommendation, counterfactual projection
- `Learn`: outcome validation and model-health metrics
- `Presentation`: Operations, Investigation, and Management views on one shared snapshot

Details: [docs/architecture.md](docs/architecture.md)

## Walkthrough

**Operations**: shows the line is live, what is partially observed, and a ranked queue of what needs attention. `S11` has higher raw risk, but `S2` ranks first because the evidence is stronger and the impact is higher.

**Decision support**: select `S2`, compare candidate actions, and simulate the recommended one to see its projected effect on throughput before committing to it.

**Investigation**: traces candidate causes for a downstream quality event at `S13`, and shows which vehicles further down the line might be affected. For `S11`, it shows that a low-cost vibration sensor at the next maintenance window would raise confidence from 42% to 81%.

**Management**: shows which predictions were correct, which were not, and how that record shapes precision, false-alert rate, and lead time.

Full script: [docs/demo-script.md](docs/demo-script.md)

## Why risk x confidence x impact

Ranking by severity alone over-prioritizes signals that are loud but weakly supported, which wastes attention and erodes trust in the system over time. Scoring by risk, confidence, and impact forces three separate questions:

- How bad could this be?
- How much do we trust this reading?
- If it is real, how much does it matter?

## Project structure

```
src/
  twin-core/      station graph and simulation engine
  understand/     signal ingestion and soft sensing
  assess/         risk scoring, confidence, and ranking
  decide/         recommendations, explanations, and projections
  learn/          outcome validation and metrics tracking
  store/          shared snapshot consumed by all views
  shared/         shared types
```

Built with React and Vite.

## Getting started

Requirements: Node.js 18+ and npm

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
```

## Current scope

Included:

- simulated production behavior in place of real plant data
- browser-based UI, no backend
- transparent, weighted scoring
- a lightweight learning loop based on the simulation's own ground truth

Not included yet:

- live PLC, MES, or ERP integration
- persistent storage across sessions
- authentication or approval workflows
- plant-specific model calibration

## Roadmap

- Extend station coverage toward a full plant
- Connect live industrial data sources
- Persist event and outcome history
- Calibrate models on real plant history
- Add operator approval and maintenance-workflow integration
- Support multi-line and multi-site deployment

## License

MIT. See [LICENSE](LICENSE).
