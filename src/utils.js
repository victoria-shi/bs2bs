export const pad = (num, digits) => {
    num = num.toString();
    while (num.length < digits) num = "0" + num;
    return num;
  }
  
export const getRandom = function(min, max) {
    return Math.random() * (max - min) + min;
  }