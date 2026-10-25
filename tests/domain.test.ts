import { describe, expect, it } from "vitest";
import { findImpactedPackages, inspectDependencies } from "../src/domain/engine.js";
describe("dependency graph", () => {
  it("orders dependencies and reports unresolved packages", () => { const result=inspectDependencies([{name:"app",dependencies:["core"]},{name:"core",dependencies:["missing"]}]); expect(result.order.indexOf("core")).toBeLessThan(result.order.indexOf("app")); expect(result.missing).toEqual(["core->missing"]); });
  it("finds transitive dependents", () => { expect(findImpactedPackages(["core"],[{name:"app",dependencies:["ui"]},{name:"ui",dependencies:["core"]}])).toEqual(["app","ui"]); });
});