import React, { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const dialog = modalRef.current;
        if (isOpen && dialog) {
            dialog.showModal();
            document.body.style.overflow = 'hidden';
        } else if (dialog) {
            dialog.close();
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    return (
        <dialog 
            ref={modalRef} 
            className="modal modal-bottom sm:modal-middle backdrop-blur-sm bg-black/40"
            onClick={handleBackdropClick}
        >
            <div className={`modal-box bg-white p-6 rounded-2xl shadow-xl w-full ${maxWidth}`}>
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <h3 className="font-bold text-xl text-[#113236]">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost hover:bg-red-50 hover:text-red-500"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="py-2">
                    {children}
                </div>
            </div>
        </dialog>
    );
};

export default Modal;
