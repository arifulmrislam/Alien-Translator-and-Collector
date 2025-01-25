import React from 'react';

const EditButton = ({ word, onEdit }) => {
    return (
        <button
            onClick={() => onEdit(word)}
            className='absolute top-12 right-2 text-blue-500 hover:text-blue-700'
        >
            Edit
        </button>
    );
};

export default EditButton;