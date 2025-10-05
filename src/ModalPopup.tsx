const ModalPopup = ({
    id,
    todo,
    deleteTodoFinal,
    closeModal,
}: {
    id: number | null;
    todo: string;
    deleteTodoFinal: (id: number) => void;
    closeModal: () => void;
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Are you sure you want to remove?</h2>
                <p>{todo}</p>
                <div className="modal-buttons">
                    <button className="cancel-btn" onClick={closeModal}>
                        Cancel
                    </button>
                    <button
                        className="remove-btn"
                        onClick={() => {
                            if (id !== null) deleteTodoFinal(id);
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalPopup;
