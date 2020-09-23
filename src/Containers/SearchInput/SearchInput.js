import React, { Component } from 'react';
import { Button, TextField }  from '@material-ui/core';
import PropTypes from 'prop-types';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state ={
      currentSearch: '',
    }
  }

  handleChange = (e) => {
    e.preventDefault(); 
    this.props.updateSearch(this.state.currentSearch);
  }

  onSearchChange = (e) => {
    e.preventDefault();
    this.setState({ currentSearch: e.currentTarget.value })
  }

  render() {
    const { currentSearch } = this.state;
    return (
      <div>
        <TextField label="Введите запрос " value={currentSearch}  onChange={this.onSearchChange} style={{marginBottom: '2%'}}/>
        <Button  onClick={this.handleChange} >Поиск</Button>
      </div>
    );
  }
}

SearchInput.propTypes = {
  updateSearch: PropTypes.func,
  search: PropTypes.string
}

export default SearchInput;