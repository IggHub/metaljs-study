const monthObj = {1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"}

//converts date into human readable, does not accept hours. 2017-10-24 01:10:30, for example
const humanReadableDate = function(dateStr){
  if(dateStr.split(" ").length > 1){
    dateStr = mediumRSSDateSlicer(dateStr);
  }

  let dateArr = dateStr.split('-');
  let year = dateArr[0];
  let date = dateArr[2];
  let normalizedMonth = parseFloat(dateArr[1]).toString()
  let month = monthObj[normalizedMonth];

  return `${month} ${date}, ${year}`
}

//reformats date from medium RSS
const mediumRSSDateSlicer = function(str){
  return str.split(" ").slice(0,1).join("")
}

//searches for image URL from (item).description key from medium RSS items
const imageSearcher = function(desc){
  let tagIndex = desc.indexOf('<img');
  let srcIndex = desc.substring(tagIndex).indexOf('src=') + tagIndex;

  let srcStart = srcIndex + 5;
  let srcEnd = desc.substring(srcStart).indexOf('"') + srcStart;

  let src = desc.substring(srcStart, srcEnd);

  return src;
}

const descriptionCleaner = function(desc){
  let cleansedDesc = desc.replace(/<(?:.|\n)*?>/gm, '');
  let maxLength = 150;
  let trimmedDesc = cleansedDesc.substring(0, maxLength);

  return trimmedDesc;
}

const mediumHelper = {
  humanReadableDate,
  imageSearcher,
  descriptionCleaner
}

export default mediumHelper;
