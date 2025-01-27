

// const DeleteButton = ({ id, onDelete }) => {
//     const handleDelete = async () => {
//         try {
//             const response = await axios.delete(`http://localhost:3000/aliens/${id}`);
//             if (response.status === 200) {
//                 onDelete(id);
//             }
//         } catch (error) {
//             console.error('Error deleting word: ', error);
//             alert('Failed to delete the word. Please try again.');
//         }
//     };

const DeleteButton = ({ id, onDelete }) => {
    const handleDelete = () => {
        // console.log('delete ID:', id);
        onDelete(id);
    };

    return (
        <button
            onClick={handleDelete}
            className='absolute top-2 right-2 text-red-500 hover:text-red-700'
        >
            Delete
        </button>
    );
};

export default DeleteButton;