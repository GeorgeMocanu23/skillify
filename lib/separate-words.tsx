export default function separateWords(string) {
  return string.replace(/([A-Z])/g, ' $1').trim()
}