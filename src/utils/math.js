const distance = (distance) => {
  if (distance > 1000) {
    distance = (Math.round(distance / 100) / 10).toFixed(1)+'km';
  }else{
    distance = Math.round(distance.toFixed(1))+'m';
  }
    return distance
  }
const isNumber = (value) => {  
  return typeof obj === 'number' && isFinite(obj)      
} 
export {distance,isNumber}