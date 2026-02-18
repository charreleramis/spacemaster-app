import { Plus, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useSupport } from './method';
import { PrimaryButton } from '../../../components/Buttons';
import { Modal } from '../../../components/Modal';
import '../style.scss';

export default function Support() {
    const {
        tickets,
        isModalOpen,
        subject,
        setSubject,
        message,
        setMessage,
        imagePreview,
        openModal,
        closeModal,
        handleImageChange,
        removeImage,
        handleSubmit,
        getStatusColor,
        getPriorityColor,
        formatDate,
    } = useSupport();

    return (
        <>
            <div className="customer-support-header">
                <div>
            <h1 className="customer-page-title">Support</h1>
            <p className="customer-page-description">
                Get help and contact our support team.
            </p>
                </div>
                <PrimaryButton onClick={openModal} className="customer-support-create-button">
                    <Plus className="size-4" />
                    Create Ticket
                </PrimaryButton>
            </div>

            <div className="customer-support-table-container">
                <table className="customer-support-table">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Created</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="customer-support-empty">
                                    No tickets found. Create your first ticket to get started.
                                </td>
                            </tr>
                        ) : (
                            tickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td className="customer-support-subject">{ticket.subject}</td>
                                    <td>
                                        <span className={`customer-support-badge ${getStatusColor(ticket.status)}`}>
                                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`customer-support-badge ${getPriorityColor(ticket.priority)}`}>
                                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                                        </span>
                                    </td>
                                    <td className="customer-support-date">{formatDate(ticket.createdAt)}</td>
                                    <td className="customer-support-date">{formatDate(ticket.updatedAt)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Create New Ticket">
                <form onSubmit={handleSubmit} className="customer-support-modal-form">
                            <div className="customer-support-modal-field">
                                <label htmlFor="subject" className="customer-support-modal-label">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="customer-support-modal-input"
                                    placeholder="Enter ticket subject"
                                    required
                                />
                            </div>

                            <div className="customer-support-modal-field">
                                <label htmlFor="message" className="customer-support-modal-label">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="customer-support-modal-textarea"
                                    placeholder="Describe your issue or question..."
                                    rows={6}
                                    required
                                />
                            </div>

                            <div className="customer-support-modal-field">
                                <label htmlFor="image" className="customer-support-modal-label">
                                    Attach Image (Optional)
                                </label>
                                {!imagePreview ? (
                                    <label htmlFor="image" className="customer-support-image-upload">
                                        <ImageIcon className="size-5" />
                                        <span>Choose image</span>
                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="customer-support-image-input"
                                        />
                                    </label>
                                ) : (
                                    <div className="customer-support-image-preview-container">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="customer-support-image-preview"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="customer-support-image-remove"
                                            aria-label="Remove image"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="customer-support-modal-actions">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="customer-support-modal-cancel"
                                >
                                    Cancel
                                </button>
                                <PrimaryButton type="submit" className="customer-support-modal-submit">
                                    Submit Ticket
                                </PrimaryButton>
                            </div>
                        </form>
            </Modal>
        </>
    );
}
