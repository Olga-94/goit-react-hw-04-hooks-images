import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { onInfoNotification } from '../../Services/Notification';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

export default function SearchBar({ onSubmit }) {
const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    setSearchQuery(e.target.value.toLowerCase())
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      onInfoNotification();
      return;
    }

    onSubmit(searchQuery);
        resetState();
  };

  const resetState = () => {
        setSearchQuery('');
    }

  
    return (
      <Header>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images"
            name="searchQuery"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </SearchForm>
      </Header>
    )
  }


SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
