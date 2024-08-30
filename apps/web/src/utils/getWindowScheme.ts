export default function getWindowScheme() {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  return mq.matches;
}
