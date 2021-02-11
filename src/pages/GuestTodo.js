import React, { Component } from 'react';
import TodoList from './TodoList';
import GuestSingleUserNav from './GuestSingleUserNav';
import '../css/MyTodo.css';

class GuestTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [
        {
          id: 1,
          text:
            'Once you sign in or sign up \n' +
            'with us, all Kudapach features can be accessed.\n',
          date: '2021-02-11',
          color: '#c2667b',
        },
        {
          id: 2,
          text:
            'This is Guest sign in page. \n' +
            'All todo cards will disappear \n' +
            'once you leave or reload the \n' +
            'page.',
          date: '2020-18-18',
          color: '#83a2fd',
        },
        {
          id: 3,
          text:
            'If you would like to \n' +
            'sign up to access all of our \n' +
            'features,please click the logo\n' +
            'on the upper left side of the \n' +
            'screen.',
          date: '2020-18-18',
          color: '#6278e1',
        },
      ],
    };
  }

  handleCreate = (data) => {
    const { cardData } = this.state;
    this.setState({
      cardData: cardData.concat({
        id: cardData.length + 1,
        updatedAt: new Date().toISOString().substring(0, 10),
        ...data,
      }),
    });
  };

  handleUpdate = (id, data) => {
    const { cardData } = this.state;
    this.setState({
      cardData: cardData.map((cardData) => {
        if (cardData.id === id) {
          return {
            id,
            color: cardData.color,
            updatedAt: cardData.updatedAt,
            ...data,
          };
        }
        return cardData;
      }),
    });
  };

  handleRemove = (id) => {
    const { cardData } = this.state;

    this.setState({
      cardData: cardData.filter((data) => data.id !== id),
    });
  };

  render() {
    const { userinfo, groupinfo, handleSignOut } = this.props;
    const { cardData } = this.state;
    return (
      <div>
        <GuestSingleUserNav
          userinfo={userinfo}
          groupinfo={groupinfo}
          handleSignOut={handleSignOut}
        />
        <div className="Box_container main_Box">
          <TodoList
            data={cardData}
            onUpdate={this.handleUpdate}
            onRemove={this.handleRemove}
            onCreate={this.handleCreate}
          />
        </div>
      </div>
    );
  }
}

export default GuestTodo;