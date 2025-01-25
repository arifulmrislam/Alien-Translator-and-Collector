import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import WordList from './components/WordList';
import AddWordForm from './components/AddWordForm.js';
import RandomWordGenerator from './components/RandomWordGenerator';
import CategoryFilter from './components/CategoryFilter';
import ShareCollection from './components/ShareCollection';

const App = () => {
    const [words, setWords] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [editingWord, setEditingWord] = useState(null);

    useEffect(() => {
        // Fetch words from the server
        axios
            .get('http://localhost:3000/aliens')
            .then((res) => setWords(res.data))
            .catch((err) => console.error('Error fetching data: ', err));
    }, []);

    // const handleDelete = async (id) => {
    //     try {
    //         const response = await axios.delete(`http://localhost:3000/aliens/${id}`);
    //         if (response.status === 200) {
    //             setWords((prevWords) => prevWords.filter((word) => word.id !== id)); // Update state
    //         }
    //     } catch (error) {
    //         console.error('Error deleting word: ', error);
    //         alert('Failed to delete the word. Please try again.');
    //     }
    // };

    const handleDelete = async (id) => {
        // update
        const previousWords = [...words];
        setWords((prevWords) => prevWords.filter((word) => word.id !== id));

        try {
            const response = await axios.delete(`http://localhost:3000/aliens/${id}`);
            if (response.status !== 200) {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting word: ', error);
            alert('Failed to delete the word. Please try again.');
            setWords(previousWords);
        }
    };

    <WordList
        words={words}
        category={selectedCategory}
        onDelete={handleDelete}
    />; //Prevent Deleted Words from Rendering

    const handleEdit = (word) => {
        setEditingWord(word);
    };

    const handleUpdate = async (updatedWord) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/aliens/${updatedWord.id}`,
                updatedWord
            );
            if (response.status === 200) {
                setWords((prevWords) =>
                    prevWords.map((word) =>
                        word.id === updatedWord.id ? response.data : word
                    )
                );
                setEditingWord(null);
            }
        } catch (error) {
            console.error('Error updating word: ', error);
            alert('Failed to update the word. Please try again.');
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col'>
            <Header />
            <div className='container mx-auto p-5'>
                <CategoryFilter
                    categories={categories}
                    setSelectedCategory={setSelectedCategory}
                />
                <WordList
                    words={words}
                    category={selectedCategory}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
                <AddWordForm
                    setWords={setWords}
                    editingWord={editingWord}
                    onUpdate={handleUpdate}
                    clearEditing={() => setEditingWord(null)}
                />
                <RandomWordGenerator />
                <ShareCollection />
            </div>
        </div>
    );
};

export default App;
