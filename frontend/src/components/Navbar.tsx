import React from "react";
import Header, { type NavigationSection } from "@/components/ui/hero-01-utils/header";
import { NAV_LINKS } from "@/data/constants";

export const Navbar: React.FC = () => {
  // Map constants NAV_LINKS to NavigationSection format
  const navigationData: NavigationSection[] = NAV_LINKS.map((link) => ({
    title: link.label,
    href: link.href,
  }));

  return <Header navigationData={navigationData} />;
};

export default Navbar;
