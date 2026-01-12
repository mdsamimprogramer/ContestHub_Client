import { Link } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

const ErrorPage = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black text-white px-4 overflow-hidden">

            {/* Neon glow background */}
            <div className="absolute inset-0">
                <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-blue-500/30 blur-[120px] rounded-full -top-24 -left-24"></div>
                <div className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-purple-500/30 blur-[120px] rounded-full bottom-0 right-0"></div>
            </div>

            {/* Glass card */}
            <motion.div
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md sm:max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-10 text-center"
                style={{ perspective: "1000px" }}
            >
                <motion.div
                    whileHover={{ rotateY: 8, rotateX: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 120 }}
                >
                    <div className="flex justify-center">
                        <Player
                            autoplay
                            loop
                            src="/forbidden.json"
                            className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]"
                        />
                    </div>

                    <h1 className="text-6xl sm:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-500 mt-2">403</h1>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-2"> Access Forbidden</h2>
                    <p className="text-gray-300 mt-2 text-sm sm:text-base">You don’t have permission to access this page. </p>

                    <Link
                        to="/"
                        className="inline-block mt-6 px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
                    >
                        Go Back Home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
