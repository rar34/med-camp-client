import { useState } from 'react';
import PropTypes from 'prop-types'

function SearchBar({ onSearch }) {
    const [keyword, setKeyword] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSearch = () => {
        onSearch({ keyword, startDate, endDate });
    };

    return (
        <div>
            <input
            className='input mr-2'
                type="text"
                placeholder="Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <input
            className='input mr-2'
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input
            className='input mr-2'
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />
            <button className='btn btn-primary' onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;

SearchBar.propTypes ={
    onSearch: PropTypes.node
}
