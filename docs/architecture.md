# Architecture Overview

This document shows a high-level architecture diagram for the project and a short explanation of the main parts.

```mermaid
flowchart LR
  subgraph DevBuild[Development & Build]
    NPM[npm / package.json]
    Vite[Vite dev server / vite.config.ts]
    Build[Build -> dist]
  end

  subgraph Client[Client (React + TypeScript)]
    Index[index.tsx\nApp.tsx]
    Layout[components/Layout.tsx]
    AssetTree[components/AssetTree.tsx]
    Pages[pages/*\n(Dashboard, ExecutionEngine, Gateway, InformationModel)]
    Config[constants.ts\nmetadata.json\ntypes.ts]
  end

  NPM --> Vite
  Vite --> Index
  Index --> Layout
  Layout --> Pages
  Layout --> AssetTree
  Pages -->|imports| Config
  Build -->|output| Dist[dist/*]

  classDef config fill:#f9f,stroke:#333,stroke-width:1;
  class Config config
```

- **Entry points:** `index.tsx` mounts `App.tsx` which composes `Layout` and routes to `pages/*`.
- **Pages:** `pages/Dashboard.tsx`, `pages/ExecutionEngine.tsx`, `pages/Gateway.tsx`, `pages/InformationModel.tsx` provide main views.
- **Components:** `components/Layout.tsx` (app shell) and `components/AssetTree.tsx` (domain asset explorer).
- **Config & types:** `constants.ts`, `types.ts`, and `metadata.json` provide shared constants, types, and metadata.
- **Build & run:** Managed via `package.json` scripts and `vite.config.ts`.

You can render this Mermaid diagram in editors that support Mermaid (VS Code with Mermaid Preview or GitHub rendering for `.md` files).
