import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import WordList from './components/WordList';
import AddWordForm from './components/AddWordForm';
import RandomWordGenerator from './components/RandomWordGenerator';
import CategoryFilter from './components/CategoryFilter';
import ShareCollection from './components/ShareCollection';

const App = () => {
    const [words, setWords] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [editingWord, setEditingWord] = useState(null);

    // const [generatedWord, setGeneratedWord] = useState(''); // changes

    const prefillAddWordForm = (randomWord) => {
      const newWord = {
        id: Date.now(), //temporary id
        name: '',
        language: randomWord,
        message: '',
        category: 'Other',
      };
      setEditingWord(newWord);

    //   setGeneratedWord(randomWord); // Store the generated word in state // changes
    };

    useEffect(() => {
        // Fetch words from the server
        axios
            .get('http://localhost:3000/aliens')
            .then((res) => setWords(res.data))
            .catch((err) => console.error('Error fetching data: ', err));
    }, []);

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
    // console.log('Update word:', updatedWord);
    if (!updatedWord.id) {
        // Treat this as a new word, because the random word doesn't have an ID
        try {
            const response = await axios.post('http://localhost:3000/aliens', updatedWord);
            if (response.status === 200) {
                setWords((prevWords) => [...prevWords, response.data]);
                setEditingWord(null); // Clear the form after adding
            }
        } catch (error) {
            console.error('Error adding word: ', error);
            alert('Failed to add the word. Please try again.');
        }
    } else {
        // Proceed with the update if there is a valid ID
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
                <RandomWordGenerator onGenerate={prefillAddWordForm} />
                <AddWordForm
                    setWords={setWords}
                    editingWord={editingWord}
                    onUpdate={handleUpdate} // Ensure handleUpdate is passed to the AddWordForm
                    clearEditing={() => setEditingWord(null)}
                />
                <ShareCollection />
            </div>
        </div>
    );
};

export default App;
