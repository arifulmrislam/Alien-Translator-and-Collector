import { useState, useEffect } from 'react';
import axios from 'axios';

const AddWordForm = ({ setWords, editingWord, onUpdate, clearEditing }) => {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('');
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (editingWord) {
            setName(editingWord.name);
            setLanguage(editingWord.language);
            setMessage(editingWord.message);
            setCategory(editingWord.category);
        } else {
            setName('');
            setLanguage('');
            setMessage('');
            setCategory('');
        }
    }, [editingWord]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const word = { name, language, message, category };

        if (editingWord) {
            // Update existing word
            onUpdate({ ...editingWord, ...word });
        } else {
            // Add new word
            axios
                .post('http://localhost:3000/aliens', word)
                .then((res) => {
                    setWords((prevWords) => [...prevWords, res.data]);
                    clearForm();
                })
                .catch((err) => console.error('Error adding word: ', err));
        }
    };

    const clearForm = () => {
        setName('');
        setLanguage('');
        setMessage('');
        setCategory('');
        clearEditing();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white p-6 rounded-lg shadow-lg mt-5'
        >
            <h2 className='text-xl font-semibold mb-4'>
                {editingWord ? 'Update Alien Word' : 'Add a New Alien Word'}
            </h2>
            <div className='mb-4'>
                <label className='block text-sm font-medium'>Earth Word</label>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-medium'>Alien Translation</label>
                <input
                    type='text'
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-medium'>Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                ></textarea>
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-medium'>Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                >
                    <option value='Greetings'>Greetings</option>
                    <option value='Food'>Food</option>
                    <option value='Space Objects'>Space Objects</option>
                    <option value='Other'>Other</option>
                </select>
            </div>
            <button type='submit' className='bg-blue-600 text-white p-2 rounded'>
                {editingWord ? 'Update Word' : 'Add Word'}
            </button>
            {editingWord && (
                <button
                    type='button'
                    onClick={clearForm}
                    className='ml-2 text-gray-600'
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default AddWordForm;
