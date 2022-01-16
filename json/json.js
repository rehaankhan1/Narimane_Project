let params = new URLSearchParams('abc=foo&def=%5Basf%5D&xyz=5');
params.get("abc"); // "foo"
function paramsToObject(entries) {
    const result = {}
    for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
  }
  const urlParams = new URLSearchParams('abc=foo&def=%5Basf%5D&xyz=5');
const entries = urlParams.entries(); //returns an iterator of decoded [key,value] tuples
const params = paramsToObject(entries); //{abc:"foo",def:"[asf]",xyz:"5"}
console.log(params);