'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Nav() {
  return (
    <div className="nav-wrapper">
      <nav className="nav">
        <motion.div
          className="nav-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src="/assets/flent-logo.png" alt="Flent" width={88} height={22} priority />
        </motion.div>
        <motion.div
          className="nav-buttons"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <button className="btn-base btn-pastel-peach">Sign in</button>
          <button className="btn-base btn-pastel-violet">Join — it&apos;s free</button>
        </motion.div>
      </nav>
    </div>
  );
}
