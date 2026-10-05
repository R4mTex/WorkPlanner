const Search = ({
    onSearch,
    label,
}: {
    onSearch: (value: string) => void;
    label: string;
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onSearch(value);
    };

    return (
        <>
            <div>
                <label htmlFor="search" className="block">
                    {label}
                </label>
                <input
                    type="text"
                    id="search"
                    onChange={handleInputChange}
                    placeholder={label}
                    className="p-2 border italic border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                />
            </div>
        </>
    );
};

export default Search;
