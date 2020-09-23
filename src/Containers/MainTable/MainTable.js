import React, {Component} from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import {connect} from 'react-redux';
import ToolTip from '../ToolTip/ToolTip';
import './MainTable.css';

class MainTable extends Component { 

  constructor(props) {
    super(props);
    this.state ={
      sortBy: {
        key: '',
        sortAsc: true,
      },
      displableId: false,
      currentPage: 1,
      usersPerPage: 50
    }
  }

  findUser = () => {
    let result;
    this.props.data.forEach(e => {if (e.id === this.state.displableId) {result = e;}});
    return result;
  }

  searchUser = () => {
    const {data, search} = this.props;
    const filteredData = data.filter(user => {
      let res = false;
      Object.keys(user).forEach(prop => {
        if (String(user[prop]).toLowerCase().includes(search.toLowerCase())) {
          res = true;
        };
      })
      return res;
    });

    return filteredData;
  }

  sortUsers = (filteredData) => {
    const { sortBy } = this.state;
    const { sortAsc, key } = sortBy;
    if (!key) {
      return filteredData;
    }
    const sortedData = JSON.parse(JSON.stringify(filteredData));

    if (key === 'id') {
    sortedData.sort((a,b) => sortAsc ? a[key] - b[key] : b[key] - a[key] );
    } else {
      sortedData.sort((a,b) => sortAsc ? (a[key].toLowerCase() < b[key].toLowerCase() && -1) : (a[key].toLowerCase() > b[key].toLowerCase() && -1))
    }

    return sortedData;
  }


  handlePaginationClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleClick = (arg) => {
    const { key, sortAsc } = this.state.sortBy;
    this.setState({sortBy: {
      sortAsc: arg === key ? !sortAsc : true,
      key: arg
    }});
  }

  handleRowClick = (id) => {
    this.setState({displableId: id});
  }

  render(){
    const {searchUser, sortUsers} = this;
    const {displableId, currentPage, usersPerPage} = this.state;
    const filteredData = searchUser();
    const sortedData = sortUsers(filteredData);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUser = sortedData.slice(indexOfFirstUser, indexOfLastUser);
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedData.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={(e) => this.handlePaginationClick(e)}
        >
          {number}
        </li>
      );
    });

      return(
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow id='Row'>
                  <TableCell onClick={() => this.handleClick('id')}>id ↕</TableCell>
                  <TableCell onClick={() => this.handleClick('firstName')}>firstName ↕</TableCell>
                  <TableCell onClick={() => this.handleClick('lastName')}>lastName ↕</TableCell>
                  <TableCell onClick={() => this.handleClick('email')}>email ↕</TableCell>
                  <TableCell onClick={() => this.handleClick('phone')}>phone ↕</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                currentUser.map((user, id) => (
                  <TableRow key={id} onClick={() => this.handleRowClick(user.id)} id='Row'>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                  </TableRow>
                ))
              }
              </TableBody>
            </Table>
          </Paper>
          <ul>{renderPageNumbers}</ul>
          {displableId ? (<ToolTip user={this.findUser()} />) : undefined}
        </div>
      );
}
}
const mapStateToProps = (state) => {
  return {
    data: state.App,
    search: state.Search
  }
}

export default connect(mapStateToProps, null)(MainTable);