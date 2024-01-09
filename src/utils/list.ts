export const chunkify = <T>(list: T[], n: number): T[][] => {
  const result = [];
  const listCopy = [...list];

  for (let i = n; i > 0; i--) {
    result.push(listCopy.splice(0, Math.ceil(listCopy.length / i)));
  }

  return result;
};
