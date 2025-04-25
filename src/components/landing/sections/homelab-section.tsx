"use client";

import { Server } from "lucide-react";
import { motion } from "motion/react";
import LandingSection from "~/components/landing/sections/landing-section";

const HomelabSection = () => (
    <LandingSection
        id="homelab"
        icon={Server}
        title="My Homelab"
        description="This is my homelab so far, it hosts all my services, including this website! I work on it in my spare time when I can (:"
    >
        <motion.ul
            className="text-white/85 font-light"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            <li>
                <b>Server Rack:</b> 22U, 32&quot; Depth
            </li>
            <li>
                <b>Router:</b> UDM Pro
            </li>
            <li>
                <b>UPS:</b> 1350VA
            </li>
            <li className="my-2.5" />
            <ul>
                <b>Proxmox Node-01:</b>
                <li>
                    - <b>Motherboard:</b> Prime B550-PLUS
                </li>
                <li>
                    - <b>CPU:</b> Ryzen 5 5600G
                </li>
                <li>
                    - <b>RAM:</b> 38GB of DDR4 @ 3200Mhz
                </li>
                <li>
                    - <b>Storage:</b> 8TB (x2 4TB, x1 4TB Parity) Unraid Array
                </li>
            </ul>
        </motion.ul>
    </LandingSection>
);
export default HomelabSection;
