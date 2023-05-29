export default function (text, kw) {
  return text.replace(kw, `<span class='text-danger'>${kw}</span>`);
}
