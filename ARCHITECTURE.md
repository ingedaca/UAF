# Architecture Overview

This document shows a high-level architecture diagram for the project and a short explanation of the main parts.

```mermaid
graph LR
  A[Development & Build] --> B[npm / package.json]
  B --> C[Vite dev server]
  C --> D[index.tsx / App.tsx]
  D --> E[Layout (app shell)]
  E --> F[Pages: Dashboard, ExecutionEngine, Gateway, InformationModel]
  E --> G[AssetTree component]
  F --> H[constants.ts / metadata.json / types.ts]
  C --> I[dist/* (build output)]
# Architecture Overview

This document shows a high-level architecture diagram for the project and a short explanation of the main parts.

```mermaid
flowchart LR
  A[DevBuild] --> B[npm_package_json]
  # Architecture Overview

  This document shows a high-level architecture diagram for the project and a short explanation of the main parts.

  ```mermaid
  graph LR
    A[DevBuild] --> B[npm]
    B --> C[Vite]
    # Architecture Overview

    This document shows a high-level architecture diagram for the project and a short explanation of the main parts.

    ```mermaid
    flowchart LR
      A[DevBuild] --> B[npm]
      B --> C[Vite]
      C --> D[IndexApp]
      D --> E[Layout]
      E --> F[Pages]
      E --> G[AssetTree]
      F --> H[Config]
      C --> I[Dist]
    ```

    - **Entry points:** `index.tsx` mounts `App.tsx` which composes `Layout` and routes to `pages/*`.
    - **Pages:** `pages/Dashboard.tsx`, `pages/ExecutionEngine.tsx`, `pages/Gateway.tsx`, `pages/InformationModel.tsx` provide main views.
    - **Components:** `components/Layout.tsx` (app shell) and `components/AssetTree.tsx` (domain asset explorer).
    - **Config & types:** `constants.ts`, `types.ts`, and `metadata.json` provide shared constants, types, and metadata.
    - **Build & run:** Managed via `package.json` scripts and `vite.config.ts`.
    You can render the Mermaid diagram in editors that support Mermaid (VS Code with Mermaid Preview or GitHub rendering for `.md` files).
