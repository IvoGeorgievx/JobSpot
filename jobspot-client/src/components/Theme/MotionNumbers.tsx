import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

const MotionNumbers = ({ value }: { value: number }) => {
	const count = useMotionValue(0);
	const rounded = useTransform(() => Math.round(count.get()));

	useEffect(() => {
		const controls = animate(count, value, { duration: 1.5 });
		return () => controls.stop();
	}, [count, value]);

	return <motion.pre style={{ margin: 0 }}>{rounded}</motion.pre>;
};

export default MotionNumbers;
