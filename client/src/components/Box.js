// import { motion, useAnimation } from "framer-motion";

// import { useInView } from "react-intersection-observer";

// import { useEffect } from "react";

// const Box = ({ num }) => {

//     const control = useAnimation();
//     const [ref, inView] = useInView();
  
//     useEffect(() => {
//       if (inView) {
//         control.start("visible");
//       } else {
//         control.start("hidden");
//       }
//     }, [control, inView]);
  
//     return (
//       <motion.div
//         className="box"
//         ref={ref}
//         variants={boxVariant}
//         initial="hidden"
//         animate={control}
//       >
//         <h1>Box {num} </h1>
//       </motion.div>
//     );
//   };

// export default Box;
  