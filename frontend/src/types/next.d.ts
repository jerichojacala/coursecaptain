import 'next';

declare module 'next' {
  type PageProps<P = {}, Q extends Record<string, string | string[]> = {}> = {
    params: P; // <-- Plain object (not Promise)
    searchParams?: Q;
  };
}