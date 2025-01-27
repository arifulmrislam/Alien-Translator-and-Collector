// // import RandomWord from './RandomWord';
// import {useState} from 'react';
// 
// const RandomWordGenerator = ({ onGenerate }) => {
//     const [randomWord, setRandomWord] = useState('');
// 
//     const fetchRandomWord = () => { 
//         fetch('https://random-word-api.vercel.app/api?words=1')
//         .then(res => res.json())
//         .then(data => {
//             const word = data[0];
//             setRandomWord(word);
//             onGenerate(word); //pass the random word back to the parent
//     })
//     .catch((err) => console.log('Error fetching random word: ', err));
// };
// 
//     return (
//         <div className='mt-5 p-4 bg-white shadow-lg rounded-lg'>
//             <h2 className='text-xl font-semibold mb-4'>Random Alien Word</h2>
//             <button
//                 onClick={fetchRandomWord}
//                 className='bg-blue-600 text-white p-2 rounded'
//             >
//                 Generate Random Word
//             </button>
//             {randomWord && (
//                 <p className='mt-4 text-gray-700'>Generated Word: {randomWord}</p>
//             )}
//         </div>
//     );
// };
// 
// export default RandomWordGenerator;


import { useState } from 'react';

const RandomWordGenerator = ({ onGenerate }) => {
    const [randomWord, setRandomWord] = useState('');

    const fetchRandomWord = () => {
        fetch('https://random-word-api.vercel.app/api?words=1')
            .then((res) => res.json())
            .then((data) => {
                const word = data[0];
                setRandomWord(word);
                onGenerate(word); // Pass the random word back to the parent to prefill
            })
            .catch((err) => console.log('Error fetching random word: ', err));
    };

    return (
        <div className='mt-5 p-4 bg-white shadow-lg rounded-lg'>
            <h2 className='text-xl font-semibold mb-4'>Random Alien Word</h2>
            <button
                onClick={fetchRandomWord}
                className='bg-blue-600 text-white p-2 rounded'
            >
                Generate Random Word
            </button>
            {randomWord && (
                <p className='mt-4 text-gray-700'>Generated Word: {randomWord}</p>
            )}
        </div>
    );
};

export default RandomWordGenerator;
