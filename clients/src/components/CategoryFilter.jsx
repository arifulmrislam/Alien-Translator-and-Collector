const CategoryFilter = ({ categories, setSelectedCategory }) => {
    return (
        <div className='mb-5'>
            <h2 className='text-lg font-semibold'>Filter by Category</h2>
            <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded'
            >
                <option value='All'>All</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
