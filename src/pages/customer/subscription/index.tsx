import { Check } from 'lucide-react';
import { PrimaryButton, GhostButton } from '../../../components/Buttons';
import { plansData } from '../../../assets/dummy-data';
import '../style.scss';
import { motion } from 'framer-motion';

export default function Subscription() {
    return (
        <>
            <h1 className="customer-page-title">Subscription</h1>
            <p className="customer-page-description">
                View and manage your subscription plans and billing information.
            </p>

            <div className="customer-subscription-grid">
                {plansData.map((plan, i) => (
                    <motion.div
                        key={plan.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`customer-subscription-card ${
                            plan.popular
                                ? 'customer-subscription-card-popular'
                                : ''
                        }`}
                    >
                        {plan.popular && (
                            <p className="customer-subscription-badge">
                                Most popular
                            </p>
                        )}

                        <div className="mb-6">
                            <p className="customer-subscription-plan-name">{plan.name}</p>
                            <div className="customer-subscription-price-container">
                                <span className="customer-subscription-price">{plan.price}</span>
                                <span className="customer-subscription-credits">
                                    / {plan.credits}
                                </span>
                            </div>
                            <p className="customer-subscription-desc">
                                {plan.desc}
                            </p>
                        </div>

                        <ul className="customer-subscription-features">
                            {plan.features.map((feat, idx) => (
                                <li key={idx} className="customer-subscription-feature">
                                    <Check className="customer-subscription-feature-icon" />
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <div>
                            {plan.popular ? (
                                <PrimaryButton className="w-full">
                                    Get started
                                </PrimaryButton>
                            ) : (
                                <GhostButton className="w-full justify-center">
                                    Get started
                                </GhostButton>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    );
}
