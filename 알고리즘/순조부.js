let N, R;

N = 5;
R = 3;

let nums = [1, 2, 3, 4, 5];
let isUsed = new Array(N).fill(false);

let result = new Array(R).fill(0);

// 순열
function perm(cnt) {
  if (cnt == R) {
    console.log(JSON.stringify(result));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (isUsed[i] == false) {
      isUsed[i] = true;
      result[cnt] = nums[i];
      perm(cnt + 1);
      isUsed[i] = false;
    }
  }
}

// 중복순열
function dupliPerm(cnt) {
  if (cnt == R) {
    console.log(JSON.stringify(result));
    return;
  }

  for (let i = 0; i < N; i++) {
    result[cnt] = nums[i];
    dupliPerm(cnt + 1);
  }
}

// 조합
function comb(start, cnt) {
  if (cnt == R) {
    console.log(JSON.stringify(result));
    return;
  }

  for (let i = start; i < N; i++) {
    result[cnt] = nums[i];
    comb(i + 1, cnt + 1);
  }
}

function dupliComb(start, cnt) {
  if (cnt == R) {
    console.log(JSON.stringify(result));
    return;
  }

  for (let i = start; i < N; i++) {
    result[cnt] = nums[i];
    dupliComb(i, cnt + 1);
  }
}

function subset(cnt) {
  if (cnt == N) {
    let temp = [];
    for (let i = 0; i < N; i++) {
      if (isUsed[i]) temp.push(nums[i]);
    }

    console.log(JSON.stringify(temp));
    return;
  }

  isUsed[cnt] = true;
  subset(cnt + 1);
  isUsed[cnt] = false;
  subset(cnt + 1);
}

// perm(0);
// dupliPerm(0);
// comb(0, 0);
// dupliComb(0, 0);
subset(0);
