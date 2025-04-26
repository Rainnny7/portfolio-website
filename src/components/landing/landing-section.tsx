"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { ComponentProps, ReactElement, ReactNode } from "react";
import { cn } from "~/lib/utils";

type LandingSectionProps = {
    /**
     * The id of the section.
     */
    id: string;

    /**
     * The optional className for the section.
     */
    className?: string | undefined;

    /**
     * The icon to display in the header.
     */
    icon: LucideIcon;

    /**
     * The title of the section.
     */
    title: string | ReactNode;

    /**
     * The duration delay for the title.
     */
    titleDurationDelay?: number | undefined;

    /**
     * The description of the section.
     */
    description: string;

    /**
     * The duration delay for the description.
     */
    descriptionDurationDelay?: number | undefined;

    /**
     * The content of the section.
     */
    children: ReactNode;

    /**
     * The optional props for the section.
     */
    props?: ComponentProps<"section">;
};

const LandingSection = ({
    id,
    icon: Icon,
    title,
    titleDurationDelay = 0.6,
    description,
    descriptionDurationDelay = 0.7,
    children,
    ...props
}: LandingSectionProps): ReactElement => (
    <section
        id={id}
        className={cn("pt-40 flex flex-col gap-4", props?.className)}
        {...props}
    >
        {/* Header */}
        <div className="flex flex-col gap-2">
            <motion.h2
                className="text-3xl sm:text-4xl font-bold flex gap-4 items-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.25, delay: titleDurationDelay }}
            >
                <Icon className="p-2 size-10 bg-primary/20 border border-border rounded-lg" />
                {title}
            </motion.h2>
            <motion.p
                className="max-w-lg sm:text-lg text-muted-foreground font-light"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.25, delay: descriptionDurationDelay }}
            >
                {description}
            </motion.p>
        </div>

        {/* Content */}
        <div>{children}</div>
    </section>
);
export default LandingSection;
