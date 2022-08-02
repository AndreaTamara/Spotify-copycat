export const cutTextString = (text,limit)=>
   text.length > limit ? `${text.substring(0, limit)}...` : text
