import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSearch } from '../../Actions/Search';
import {setData} from '../../Actions/App';

import SearchInput from '../SearchInput/SearchInput';
import MainTable from '../MainTable/MainTable';
import {fetchData} from '../../Utils/utils';

import './App.css';

class App extends Component {
  async componentDidMount(){
    const DB = await fetchData();
    this.props.setData(DB);
  }
  render() {
    return (
      <div className="container">
        <SearchInput updateSearch={this.props.updateSearch} search={this.props.search}/>
        <MainTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.Search,
    data: state.App,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSearch: (search) => dispatch(updateSearch(search)),
    setData: (data) => dispatch(setData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);