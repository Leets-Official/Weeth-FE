export default function checkTitle(title: string) {
  // title 마지막 음절의 유니코드(UTF-16)
  const charCode = title.charCodeAt(title.length - 1);

  // 유니코드의 한글 범위 내에서 해당 코드의 받침 확인
  const consonantCode = (charCode - 44032) % 28;

  if (consonantCode === 0) {
    // 받침이 없으면 '가'
    return `가`;
  }
  // 받침이 있으면 '이'
  return `이`;
}
