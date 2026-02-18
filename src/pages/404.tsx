import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { PrimaryButton } from '../components/Buttons';
import { motion } from 'framer-motion';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="not-found-animation"
                >
                    <h1 className="not-found-code">404</h1>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="not-found-title">Page Not Found</h2>
                    <p className="not-found-description">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="not-found-actions"
                >
                    <PrimaryButton onClick={() => navigate('/')}>
                        <Home className="size-4" />
                        Go Home
                    </PrimaryButton>
                    <button
                        onClick={() => navigate(-1)}
                        className="not-found-back-button"
                    >
                        <ArrowLeft className="size-4" />
                        Go Back
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
