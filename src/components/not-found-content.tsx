"use client";

import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import { ReactElement } from "react";
import { Button } from "~/components/ui/button";

const NotFoundContent = (): ReactElement => {
    const router = useTransitionRouter();
    return (
        <div className="flex gap-16 items-center">
            <motion.div
                className="hidden sm:block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
            >
                <Image
                    src="/media/not-found-illustration.svg"
                    alt="Not Found Illustration"
                    width={172}
                    height={200}
                    draggable={false}
                    unoptimized
                />
            </motion.div>

            <div className="flex flex-col gap-2">
                <motion.h1
                    className="text-4xl font-bold"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Page not found ):
                </motion.h1>
                <motion.p
                    className="max-w-sm text-lg text-muted-foreground font-light"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    The page you are looking for does not exist.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button
                        className="group mt-3.5 w-fit gap-1"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform transform-gpu" />
                        Go back
                    </Button>
                </motion.div>
            </div>
        </div>
    );
};
export default NotFoundContent;
