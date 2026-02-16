import { Link } from 'react-router-dom';
import { ArrowLeftIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { PrimaryButton } from '../../components/Buttons';
import { motion } from 'framer-motion';
import { useSignIn } from './method';
import { signInStyles } from './style';

export default function SignIn() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        handleSubmit,
        togglePasswordVisibility,
    } = useSignIn();

    return (
        <div className={signInStyles.container}>
            <motion.div
                className={signInStyles.cardWrapper}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Back to home link */}
                <Link
                    to="/"
                    className={signInStyles.backLink}
                >
                    <ArrowLeftIcon className="size-4" />
                    Back to home
                </Link>

                {/* Sign in card */}
                <motion.div
                    className={signInStyles.card}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className={signInStyles.header}>
                        <h1 className={signInStyles.title}>Welcome back</h1>
                        <p className={signInStyles.subtitle}>Sign in to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className={signInStyles.form}>
                        {/* Email field */}
                        <div>
                            <label htmlFor="email" className={signInStyles.label}>
                                Email address
                            </label>
                            <div className={signInStyles.inputWrapper}>
                                <MailIcon className={signInStyles.icon} />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={signInStyles.input}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div>
                            <label htmlFor="password" className={signInStyles.label}>
                                Password
                            </label>
                            <div className={signInStyles.inputWrapper}>
                                <LockIcon className={signInStyles.icon} />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={signInStyles.inputWithToggle}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className={signInStyles.toggleButton}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="size-5" />
                                    ) : (
                                        <EyeIcon className="size-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot password */}
                        <div className={signInStyles.checkboxContainer}>
                            <label className={signInStyles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    className={signInStyles.checkbox}
                                />
                                <span className={signInStyles.checkboxText}>Remember me</span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className={signInStyles.forgotPasswordLink}
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit button */}
                        <PrimaryButton type="submit" className={signInStyles.submitButton}>
                            Sign in
                        </PrimaryButton>
                    </form>

                    {/* Sign up link */}
                    <div className={signInStyles.footer}>
                        <p className={signInStyles.footerText}>
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className={signInStyles.footerLink}
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
