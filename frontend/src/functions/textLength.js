export default function TextLength(text, textMaxLength) {
  if (text.length > textMaxLength) {
    return text.substring(0, textMaxLength)+"..." ;
  }else{
     return text
  }
}
