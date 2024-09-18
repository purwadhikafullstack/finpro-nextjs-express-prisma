import { usePathname, useSearchParams } from 'next/navigation';

export const useActivePath = () => {
  const pathname = usePathname();
  const search = useSearchParams();

  /**
   * Supported Patterns
   *
   * isActivePath('/foo')
   * isActivePath('foo')
   * isActivePath('foo/*')
   * isActivePath('foo/**')
   * isActivePath('foo/bar')
   * isActivePath('foo/bar/*')
   */
  const check = (path: string) => {
    if (!path.startsWith('/')) path = '/' + path;
    if (path.endsWith('/*')) return wildcard(path);
    if (path.endsWith('/**')) return deep(path);
    return path == pathname;
  };

  /**
   * isActivePath('foo/*')
   * isActivePath('foo/bar/*')
   */
  const wildcard = (path: string) => {
    const segment = path.slice(0, -2);
    if (!pathname.startsWith(segment)) return false;
    const remainingPathSegment = pathname.slice(segment.length).slice(1);
    return remainingPathSegment !== '' && !remainingPathSegment.includes('/');
  };

  /**
   * isActivePath('foo/**')
   * isActivePath('foo/bar/**')
   */
  const deep = (path: string) => {
    const segment = path.slice(0, -3);
    return pathname.startsWith(segment);
  };

  return check;
};
