import '../style.scss';

export default function TermsAndPolicy() {
    return (
        <>
            <h1 className="customer-page-title">Terms & Policy</h1>
            <p className="customer-page-description">
                Please read our terms of service and privacy policy carefully.
            </p>

            <div className="customer-service-detail-card" style={{ marginTop: '2rem' }}>
                <div className="customer-service-detail-card-header">
                    <h2 className="customer-service-detail-card-title">Terms of Service</h2>
                </div>
                <div className="customer-service-detail-card-body">
                    <div style={{ lineHeight: '1.8', color: '#374151' }}>
                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                1. Acceptance of Terms
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
                            </p>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                2. Use License
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Modify or copy the materials</li>
                                <li style={{ marginBottom: '0.5rem' }}>Use the materials for any commercial purpose or for any public display</li>
                                <li style={{ marginBottom: '0.5rem' }}>Attempt to decompile or reverse engineer any software contained on our website</li>
                                <li style={{ marginBottom: '0.5rem' }}>Remove any copyright or other proprietary notations from the materials</li>
                            </ul>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                3. Service Description
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                We provide design, development, and digital marketing services. All services are provided subject to availability and our standard terms and conditions.
                            </p>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                4. Payment Terms
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                Payment terms will be specified in individual service agreements. All payments are due as specified in the agreement. Late payments may result in service suspension.
                            </p>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                5. Intellectual Property
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                All content, designs, and materials created by us remain our intellectual property until full payment is received, at which point ownership transfers as specified in the service agreement.
                            </p>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                6. Limitation of Liability
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <div className="customer-service-detail-card" style={{ marginTop: '2rem' }}>
                <div className="customer-service-detail-card-header">
                    <h2 className="customer-service-detail-card-title">Privacy Policy</h2>
                </div>
                <div className="customer-service-detail-card-body">
                    <div style={{ lineHeight: '1.8', color: '#374151' }}>
                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                1. Information We Collect
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                We collect information that you provide directly to us, including:
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Name and contact information</li>
                                <li style={{ marginBottom: '0.5rem' }}>Payment information</li>
                                <li style={{ marginBottom: '0.5rem' }}>Project requirements and communications</li>
                                <li style={{ marginBottom: '0.5rem' }}>Account credentials</li>
                            </ul>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                2. How We Use Your Information
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                We use the information we collect to:
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Provide, maintain, and improve our services</li>
                                <li style={{ marginBottom: '0.5rem' }}>Process transactions and send related information</li>
                                <li style={{ marginBottom: '0.5rem' }}>Send technical notices and support messages</li>
                                <li style={{ marginBottom: '0.5rem' }}>Respond to your comments and questions</li>
                            </ul>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                3. Information Sharing
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>
                                <li style={{ marginBottom: '0.5rem' }}>With your consent</li>
                                <li style={{ marginBottom: '0.5rem' }}>To comply with legal obligations</li>
                                <li style={{ marginBottom: '0.5rem' }}>To protect our rights and safety</li>
                                <li style={{ marginBottom: '0.5rem' }}>With service providers who assist in our operations</li>
                            </ul>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                4. Data Security
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                5. Your Rights
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                You have the right to:
                            </p>
                            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem', listStyleType: 'disc' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Access your personal information</li>
                                <li style={{ marginBottom: '0.5rem' }}>Correct inaccurate information</li>
                                <li style={{ marginBottom: '0.5rem' }}>Request deletion of your information</li>
                                <li style={{ marginBottom: '0.5rem' }}>Object to processing of your information</li>
                            </ul>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                6. Cookies and Tracking
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        <section style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                7. Changes to This Policy
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#111827' }}>
                                8. Contact Us
                            </h3>
                            <p style={{ marginBottom: '1rem' }}>
                                If you have any questions about this Privacy Policy, please contact us through our support channels.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

