export interface DependencyNode { name: string; dependencies: string[] }
export interface DependencyAnalysis { order: string[]; missing: string[]; cycles: string[] }
export function inspectDependencies(nodes: readonly DependencyNode[]): DependencyAnalysis {
  const byName=new Map(nodes.map(node=>[node.name,node])); const missing:string[]=[]; const cycles:string[]=[]; const order:string[]=[]; const state=new Map<string,number>();
  const visit=(name:string):void=>{ const current=state.get(name)??0; if(current===1){cycles.push(name);return;} if(current===2)return; const node=byName.get(name); if(!node)return; state.set(name,1); for(const dependency of [...node.dependencies].sort()){ if(!byName.has(dependency)) missing.push(name+"->"+dependency); else visit(dependency); } state.set(name,2); order.push(name); };
  for(const name of [...byName.keys()].sort()) visit(name);
  return {order,missing:[...new Set(missing)].sort(),cycles:[...new Set(cycles)].sort()};
}
export function findImpactedPackages(changed: readonly string[], nodes: readonly DependencyNode[]): string[] {
  const reverse=new Map<string,string[]>(); for(const node of nodes) for(const dependency of node.dependencies){const parents=reverse.get(dependency)??[];parents.push(node.name);reverse.set(dependency,parents);}
  const visited=new Set(changed); const queue=[...changed]; while(queue.length){const current=queue.shift();if(!current)continue;for(const parent of reverse.get(current)??[])if(!visited.has(parent)){visited.add(parent);queue.push(parent);}}
  return [...visited].filter(name=>!changed.includes(name)).sort();
}