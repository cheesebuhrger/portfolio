import { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { animationPageOut } from "@/utils/animations";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const TransitionLink = ({
  href,
  children,
  className = "",
}: TransitionLinkProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== href) {
      animationPageOut(href, router);
    }
  };

  return (
    <Link href={href} className={className} onClick={handleNavigation}>
      {children}
    </Link>
  );
};

export default TransitionLink;
