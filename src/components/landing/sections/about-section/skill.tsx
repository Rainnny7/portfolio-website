import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement } from "react";
import SimpleTooltip from "~/components/simple-tooltip";
import { Skill } from "~/types/app-config";

const AboutSkill = ({
    skill,
    index,
}: {
    skill: Skill;
    index: number;
}): ReactElement => (
    <motion.div
        variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    delay: 0.5 + index * 0.07,
                    duration: 0.3,
                    ease: "easeOut",
                },
            },
        }}
    >
        <SimpleTooltip content={skill.name} side="bottom">
            <Link
                className="flex items-center gap-2 hover:opacity-75 transition-opacity transform-gpu"
                href={skill.link}
                target="_blank"
                draggable={false}
            >
                <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={32}
                    height={32}
                    draggable={false}
                />
            </Link>
        </SimpleTooltip>
    </motion.div>
);
export default AboutSkill;
