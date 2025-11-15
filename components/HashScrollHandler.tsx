"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * HashScrollHandler Component
 *
 * Handles smooth scrolling to hash anchors in Next.js App Router.
 * Waits for elements to be available in the DOM before scrolling.
 *
 * Usage: Add to root layout as <HashScrollHandler />
 */
export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Function to scroll to element
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const targetId = hash.substring(1);

      // Try to find element immediately
      let element = document.getElementById(targetId);

      if (element) {
        // Element exists, scroll to it
        setTimeout(() => {
          element?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        // Element doesn't exist yet, wait for it using MutationObserver
        const observer = new MutationObserver(() => {
          element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            observer.disconnect();
          }
        });

        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
        });

        // Cleanup: disconnect observer after 5 seconds
        const timeout = setTimeout(() => {
          observer.disconnect();
        }, 5000);

        return () => {
          observer.disconnect();
          clearTimeout(timeout);
        };
      }
    };

    // Scroll on mount and when pathname changes
    scrollToHash();

    // Also listen for hash changes (for same-page navigation)
    const handleHashChange = () => {
      scrollToHash();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  return null;
}
