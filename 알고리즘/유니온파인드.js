let p = {};

function makeSet(x) {
  if (x in p) return;
  else p[x] = x;
}

function findSet(x) {
  if (p[x] != x) {
    p[x] = findSet(p[x]);
  }
  return p[x];
}

function union(a, b) {
  let rootX = findSet(a);
  let rootY = findSet(b);

  if (rootX == rootY) return;
  else p[rootY] = rootX;
}
