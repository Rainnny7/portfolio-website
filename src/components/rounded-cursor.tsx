"use client";

import { ReactElement, useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

const RoundedCursor = (): ReactElement | undefined => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState<boolean>(true);
    const [hasMouse, setHasMouse] = useState<boolean>(false);
    const [clickable, setClickable] = useState<boolean>(false);
    const [dragging, setDragging] = useState<boolean>(false);
    const lastYRef = useRef<number>(0);
    const hasMovedRef = useRef<boolean>(false);

    useEffect(() => {
        // Check if device has mouse capabilities
        const checkForMouse = () => {
            // matchMedia is more reliable than checking window.navigator.maxTouchPoints
            const hasCoarsePointer =
                window.matchMedia("(pointer: coarse)").matches;
            const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

            // Only show cursor on devices with fine pointer (mouse) and no coarse pointer (touch)
            setHasMouse(hasFinePointer && !hasCoarsePointer);
        };
        checkForMouse();

        const mediaQuery = window.matchMedia("(pointer: fine)");
        mediaQuery.addListener(checkForMouse);

        if (!hasMouse) return;

        const handleMouseMove = (event: MouseEvent) => {
            if (!hasMovedRef.current) {
                hasMovedRef.current = true;
                setVisible(true);
            }

            // Use transform for smooth movement
            if (ref.current) {
                const scale = clickable ? 1.15 : 1;
                ref.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%) scale(${scale})`;
            }

            // Handle scrolling while dragging
            if (dragging) {
                const deltaY = event.clientY - lastYRef.current;
                window.scrollBy(0, -deltaY);
            }
            lastYRef.current = event.clientY;
        };

        const isClickable = (element: HTMLElement | null): boolean => {
            if (!element) return false;

            // Check if the element itself is clickable
            if (
                element.tagName.toLowerCase() === "button" ||
                element.tagName.toLowerCase() === "a" ||
                element.getAttribute("role") === "button" ||
                element.hasAttribute("tabindex") ||
                element.onclick !== null ||
                window.getComputedStyle(element).cursor === "pointer"
            ) {
                return true;
            }

            // Check parent elements until we reach the body
            if (
                element.parentElement &&
                element.parentElement !== document.body
            ) {
                return isClickable(element.parentElement);
            }
            return false;
        };

        const handleMouseOver = (event: MouseEvent) => {
            setClickable(isClickable(event.target as HTMLElement));
        };

        const handleMouseDown = (event: MouseEvent) => {
            // Drag while holding the left mouse button
            if (event.button === 0) {
                setDragging(true);
                lastYRef.current = event.clientY;
            }
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        const handleMouseLeave = () => {
            setDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [visible, hasMouse, dragging, clickable]);

    useEffect(() => {
        // Set initial position
        if (ref.current) {
            ref.current.style.transform = `translate3d(${
                window.innerWidth / 2
            }px, ${
                window.innerHeight / 2
            }px, 0) translate(-50%, -50%) scale(${1})`;
        }
    }, [visible, hasMouse]);

    if (!hasMouse) return undefined;

    return (
        <div
            ref={ref}
            className={cn(
                "fixed left-0 top-0 size-3 rounded-full pointer-events-none transition-[width,height] duration-200 transform-gpu z-[9999] transform-origin-center",
                clickable ? "size-6 border-2 border-white" : "size-3 bg-white",
                dragging && "size-6 bg-white/75",
                !visible && "hidden"
            )}
        />
    );
};
export default RoundedCursor;
