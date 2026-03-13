import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import ParticleField from '../components/three/ParticleField';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative h-screen w-full bg-bg-base overflow-hidden flex flex-col items-center justify-center">
            {/* 3D background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <ParticleField />
                </Canvas>
            </div>

            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8"
                >
                    <h1 className="font-heading text-9xl text-sage/20 relative">
                        404
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono text-xl tracking-[0.5em] text-white/40 uppercase">Lost in Space</span>
                        </div>
                    </h1>
                </motion.div>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-ui text-white/30 text-sm max-w-xs mx-auto mb-12 leading-relaxed"
                >
                    The thoughts you're looking for have drifted beyond the current orbit.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => navigate('/')}
                    className="px-12 py-4 bg-white/5 border border-white/10 rounded-full font-ui font-semibold hover:bg-white hover:text-bg-base transition-all duration-500"
                >
                    Return to Center
                </motion.button>
            </div>
        </div>
    );
};

export default NotFound;
