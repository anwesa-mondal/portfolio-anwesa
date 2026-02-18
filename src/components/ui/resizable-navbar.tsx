"use client";
import { images } from "@/constants/images";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";

import React, { useRef, useState, useCallback, memo } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
  activeSection?: number;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = memo(({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);
  const lastScrollY = useRef(0);

  const handleScrollChange = useCallback((latest: number) => {
    // Throttle updates to reduce re-renders
    if (Math.abs(latest - lastScrollY.current) > 10) {
      setVisible(latest > 100);
      lastScrollY.current = latest;
    }
  }, []);

  useMotionValueEvent(scrollY, "change", handleScrollChange);

  const memoizedChildren = React.useMemo(
    () =>
      React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      ),
    [children, visible]
  );

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {memoizedChildren}
    </motion.div>
  );
});

Navbar.displayName = "Navbar";

export const NavBody = memo(
  ({ children, className, visible }: NavBodyProps) => {
    return (
      <motion.div
        animate={{
          width: visible ? "60%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        style={{
          minWidth: "800px",
        }}
        className={cn(
          "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
          visible && "bg-white/80 dark:bg-neutral-800/60 backdrop-blur-xs",
          className
        )}
      >
        {children}
      </motion.div>
    );
  }
);

NavBody.displayName = "NavBody";

export const NavItems = memo(
  ({ items, className, onItemClick, activeSection = 0 }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    const handleMouseEnter = useCallback((idx: number) => setHovered(idx), []);
    const handleMouseLeave = useCallback(() => setHovered(null), []);

    return (
      <motion.div
        onMouseLeave={handleMouseLeave}
        className={cn(
          "absolute inset-0 hidden flex-1 flex-row items-center justify-end space-x-2 text-md font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
          className
        )}
      >
        {items.map((item, idx) => (
          <Link
            onMouseEnter={() => handleMouseEnter(idx)}
            onClick={onItemClick}
            className={`relative px-4 py-2 transition-colors ${
              activeSection === idx
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-neutral-600 dark:text-neutral-300"
            }`}
            key={`link-${idx}`}
            href={item.link}
          >
            {(hovered === idx || activeSection === idx) && (
              <motion.div
                layoutId={activeSection === idx ? "active" : "hovered"}
                className={`absolute inset-0 h-full w-full rounded-full ${
                  activeSection === idx
                    ? "bg-blue-100 dark:bg-violet-900/30"
                    : "bg-gray-100 dark:bg-neutral-800"
                }`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </Link>
        ))}
      </motion.div>
    );
  }
);

NavItems.displayName = "NavItems";

export const MobileNav = memo(
  ({ children, className, visible }: MobileNavProps) => {
    return (
      <motion.div
        animate={{
          width: visible ? "90%" : "100%",
          paddingRight: visible ? "12px" : "0px",
          paddingLeft: visible ? "12px" : "0px",
          borderRadius: visible ? "4px" : "2rem",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className={cn(
          "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
          visible && "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm",
          className
        )}
      >
        {children}
      </motion.div>
    );
  }
);

MobileNav.displayName = "MobileNav";

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = memo(
  ({ children, className, isOpen, onClose }: MobileNavMenuProps) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-lg dark:bg-neutral-950",
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

MobileNavMenu.displayName = "MobileNavMenu";

export const MobileNavToggle = memo(
  ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    return isOpen ? (
      <IconX className="text-black dark:text-white" onClick={onClick} />
    ) : (
      <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
    );
  }
);

MobileNavToggle.displayName = "MobileNavToggle";

export const NavbarLogo = () => {
  return (
    <Link
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-4 px-2 py-1 text-sm font-normal text-black"
    >
      <Image src={images.logo} alt="logo" width={30} height={30} />
      <span className="font-medium text-black text-lg dark:text-white">
        Anwesa
      </span>
    </Link>
  );
};

type NavbarButtonProps = {
  variant?: "primary" | "secondary" | "dark" | "gradient";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

export const NavbarButton = ({
  variant = "primary",
  className,
  children,
  onClick,
  href,
  ...props
}: NavbarButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  const Component = href ? "a" : "button";

  return (
    <Component
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
      href={href}
      {...props}
    >
      {children}
    </Component>
  );
};
