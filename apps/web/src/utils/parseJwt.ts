export default function parseJWT(token: string) {
  try {
    if (!token) throw new Error('token missing');

    const base64url = token.split('.')[1];
    const base64 = base64url.replace('-', '+').replace('_', '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');

    return JSON.parse(jsonPayload);
  } catch (err) {
    throw err;
  }
}
