import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { IMole } from "../types/definitions";

const variants = {
    start: {
        y: 0,
        transition: {
            duration: 0.1,
            ease: "easeInOut",
        },
    },

    reset: {
        y: 300,
        transition: {
            duration: 0.1,
            ease: "easeInOut",
        },
    },
};


const Hole = ({ isUp, isBomb, onClick }: IMole) => {
    const controls = useAnimation();

    const handleClick = () => {
        controls.start("reset");
        onClick();
    };

    useEffect(() => {
        if (isUp > 0) {
            controls.start("start");
        } else {
            controls.start("reset");
        }
    }, [controls, isUp]);

    return (
        <div className="hole" data-testid="hole">
            <AnimatePresence>
                <motion.div
                    data-testid={isBomb ? "moleup-bomb" : isUp ? "moleup" : "mole"}
                    initial={{ y: 100 }}
                    variants={variants}
                    animate={controls}
                    className={isBomb ? "mole isBomb" : "mole"}
                    onClick={handleClick}
                />
            </AnimatePresence>
        </div>
    );
};

export default Hole;
