const parseDate = (timeStamp: string): string => {
  const date = new Date(timeStamp);

  const Y = date.getFullYear();
  const M = date.getMonth();
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();

  // console.log(Y + M + D + h + m + s);
  return `${Y}-${M < 10 ? '0' + (M + 1) : M}-${D} ${
    h < 10 ? '0' + h : h
  }:${m}:${s < 10 ? '0' + s : s}`;
};

export { parseDate };
