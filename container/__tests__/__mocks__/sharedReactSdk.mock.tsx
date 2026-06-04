import type { JSX, ReactNode } from "react";

interface LoaderScreenStubProps {
  className?: string;
}

interface FooterStubProps {
  title: string;
  children?: ReactNode;
  onSubmitSubscribe: (value: string) => void;
}

export const LoaderScreen = ({ className }: LoaderScreenStubProps): JSX.Element => {
  return <div data-testid="loader-screen" className={className} />;
};

export const FooterWithSubscribeNewsletter = ({
  title,
  children,
}: FooterStubProps): JSX.Element => {
  return (
    <div data-testid="footer-with-subscribe-newsletter">
      <p>{title}</p>
      {children}
    </div>
  );
};
