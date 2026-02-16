import { Link } from 'react-router-dom';
import { ArrowLeftIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon, PhoneIcon } from 'lucide-react';
import { PrimaryButton } from '../../components/Buttons';
import { motion } from 'framer-motion';
import { useSignUp } from './method';
import { signUpStyles } from './style';

export default function SignUp() {
    const {
        name,
        setName,
        phone,
        setPhone,
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        handleSubmit,
        togglePasswordVisibility,
    } = useSignUp();

    return (
        <div className={signUpStyles.container}>
            <motion.div
                className={signUpStyles.cardWrapper}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Back to home link */}
                <Link
                    to="/"
                    className={signUpStyles.backLink}
                >
                    <ArrowLeftIcon className="size-4" />
                    Back to home
                </Link>

                {/* Sign up card */}
                <motion.div
                    className={signUpStyles.card}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className={signUpStyles.header}>
                        <h1 className={signUpStyles.title}>Create an account</h1>
                        <p className={signUpStyles.subtitle}>Sign up to get started with your journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className={signUpStyles.form}>
                        {/* Name field */}
                        <div>
                            <label htmlFor="name" className={signUpStyles.label}>
                                Full Name
                            </label>
                            <div className={signUpStyles.inputWrapper}>
                                <UserIcon className={signUpStyles.icon} />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className={signUpStyles.input}
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Phone field */}
                        <div>
                            <label htmlFor="phone" className={signUpStyles.label}>
                                Phone Number
                            </label>
                            <div className={signUpStyles.inputWrapper}>
                                <PhoneIcon className={signUpStyles.icon} />
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className={signUpStyles.input}
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>

                        {/* Email field */}
                        <div>
                            <label htmlFor="email" className={signUpStyles.label}>
                                Email address
                            </label>
                            <div className={signUpStyles.inputWrapper}>
                                <MailIcon className={signUpStyles.icon} />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={signUpStyles.input}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div>
                            <label htmlFor="password" className={signUpStyles.label}>
                                Password
                            </label>
                            <div className={signUpStyles.inputWrapper}>
                                <LockIcon className={signUpStyles.icon} />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={signUpStyles.inputWithToggle}
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className={signUpStyles.toggleButton}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="size-5" />
                                    ) : (
                                        <EyeIcon className="size-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit button */}
                        <PrimaryButton type="submit" className={signUpStyles.submitButton}>
                            Create account
                        </PrimaryButton>
                    </form>

                    {/* Sign in link */}
                    <div className={signUpStyles.footer}>
                        <p className={signUpStyles.footerText}>
                            Already have an account?{' '}
                            <Link
                                to="/signin"
                                className={signUpStyles.footerLink}
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
