import React from 'react';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const WordList = ({ words, category, onDelete, onEdit }) => {
    const filteredWords =
        category === 'All'
            ? words
            : words.filter((word) => word.category === category);

    return (
        <div className='mt-5'>
            <h2 className='text-xl font-semibold mb-4'>Alien Words</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {filteredWords.map((word) => (
                    <div
                        key={word.id}
                        className='bg-white shadow-lg rounded-lg p-4 relative'
                    >
                        <h3 className='text-lg font-semibold'>{word.name}</h3>
                        <p>{word.language}</p>
                        <p className='text-sm text-gray-500'>{word.message}</p>
                        <DeleteButton id={word.id} onDelete={onDelete} />
                        <EditButton word={word} onEdit={onEdit} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WordList;
