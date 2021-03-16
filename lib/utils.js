export function id2method(str) {
  return str.replace(/-([a-z0-9])/g, (matches, a) => {
    return '' + a.toUpperCase();
  });
}

export async function sleep(t = 0) {
  return new Promise(res => setTimeout(res, t));
}

export function time() {
  return ~~(Date.now() / 1000);
}