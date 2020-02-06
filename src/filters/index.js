// 秒数转时间  65 =》 01:05
exports.formatMediaTime = (Num) => {
  function add0(m) {return m < 10 ? '0' + m : m}

  if (isNaN(Number(Num))) {return Num}

  let min = Math.floor(Num / 60)
  let second = Num - min * 60
  min = add0(m)
  second = add0(second)
  return min + ':' + second
}