import parseJWT from 'utils/parseJwt';

export function isTokenExpired(token: string): boolean {
  const parsedToken = parseJWT(token);
  const currentTime = Math.floor(Date.now() / 1000);
  return parsedToken.exp < currentTime;
}
