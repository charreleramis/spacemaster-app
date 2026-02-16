import { UserIcon, PhoneIcon, MailIcon, LockIcon } from 'lucide-react';
import { useSettings } from './method';
import '../style.scss';

export default function Settings() {
    const {
        // Profile
        name,
        setName,
        phone,
        setPhone,
        email,
        // Password
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        handleSubmit,
    } = useSettings();

    return (
        <>
            <h1 className="customer-page-title">Settings</h1>
            <p className="customer-page-description">
                Manage your account settings and preferences.
            </p>

            {/* Profile and Password Side by Side */}
            <div className="customer-settings-section">
                <div className="customer-settings-card">
                    <form onSubmit={handleSubmit} className="customer-settings-form">
                        <div className="customer-settings-form-grid">
                            {/* Profile Information */}
                            <div className="customer-settings-form-column">
                                <div className="customer-settings-fields-group">
                                    <div className="customer-settings-field">
                                        <label htmlFor="name" className="customer-settings-label">
                                            <UserIcon className="size-4" />
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="customer-settings-input"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="customer-settings-field">
                                        <label htmlFor="phone" className="customer-settings-label">
                                            <PhoneIcon className="size-4" />
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="customer-settings-input"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>

                                    <div className="customer-settings-field">
                                        <label htmlFor="email" className="customer-settings-label">
                                            <MailIcon className="size-4" />
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            disabled
                                            className="customer-settings-input"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Change Password */}
                            <div className="customer-settings-form-column">
                                <div className="customer-settings-fields-group">
                                    <div className="customer-settings-field">
                                        <label htmlFor="currentPassword" className="customer-settings-label">
                                            <LockIcon className="size-4" />
                                            Current Password
                                        </label>
                                        <input
                                            id="currentPassword"
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="customer-settings-input"
                                            placeholder="Enter your current password"
                                        />
                                    </div>

                                    <div className="customer-settings-field">
                                        <label htmlFor="newPassword" className="customer-settings-label">
                                            New Password
                                        </label>
                                        <input
                                            id="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="customer-settings-input"
                                            placeholder="Enter your new password"
                                        />
                                    </div>

                                    <div className="customer-settings-field">
                                        <label htmlFor="confirmPassword" className="customer-settings-label">
                                            Confirm New Password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="customer-settings-input"
                                            placeholder="Confirm your new password"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Single Update Button */}
                        <div className="customer-settings-button-container">
                            <button type="submit" className="customer-settings-button">
                                Update Settings
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
