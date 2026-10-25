# Architecture

## Boundaries

The domain layer owns validation and project-specific deterministic logic. The repository interface isolates persistence. HTTP handlers translate requests into service calls and map known domain errors to safe responses.

## Project-specific core

SupplyChain Lens maps dependency relationships, unresolved references, cycles, and transitive impact from component metadata. It can consume an SBOM later without downloading or executing third-party code.

## Deliberate limitations

The included server uses an in-memory repository and has no authentication. It is suitable for local exploration and tests only. A production deployment needs durable transactional storage, access control, request limits, observability, and a documented threat model.
