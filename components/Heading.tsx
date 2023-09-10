import { ReactNode } from 'react';

export default function Heading({ children }: { children: ReactNode }) {
  return (
    <h1 className={`font-bold text-2xl pb-3 font-orbitron pt-2`}>{children}</h1>
  );
}
