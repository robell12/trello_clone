class BoardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { board: {}, loading: true }
    this.modalDisplay = this.modalDisplay.bind(this);
    this.addList = this.addList.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  componentWillReceiveProps(newProps) {
    $.ajax({
      url: `/boards/${newProps.boardId}`,
      type: 'GET',
      dataType: 'JSON',
    }).success( board => {
      this.setState({ board, loading: false})
    }).fail( data => {
      this.setState({ loading: false})
      console.log(data)
    })
  }

  displayLists() {
    let board = this.state.board;
    if(board.lists) {
      return board.lists.map( list => {
        return(
          <List key={list.id}
                list={list}
                deleteList={this.deleteList}
                boardId={board.id}
                editItem={this.editItem}
               />
          );
      })
    } else {
      return(<h4>No Lists, Please Add One!</h4>);
    }
  }

  addList(e) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.state.board.id}/lists`,
      type: 'POST',
      dataType: 'JSON',
      data: { list: {title: this.refs.listName.value }}
    }).success( list => {
      let board = this.state.board;
      board.lists.push(list);
      this.setState({board });
      this.refs.addListForm.reset();
      this.refs.listName.focus();
    }).fail( data => {
      console.log(data)
    })
  }

  modalDisplay() {
    // add a new form to add a list to a board
    let board = this.state.board;

    if(this.state.loading) {
      return(<h4>Loading Data...</h4>)
    } else {
      return(
        <div>
          <h4> {board.name} </h4>
          <form ref='addListForm' onSubmit={this.addList}>
            <input type='text' required ref='listName' placeholder='List Name' />
            <input type='submit' className='btn' />
          </form>
          <hr />
          {this.displayLists() }
        </div>
      )
    }
  }

  deleteList(e, id, boardId) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${boardId}/lists/${id}`,
      type: 'DELETE'
    }).success( data => {
      // figure out how to set state and remove that board
      let board = this.state.board;
      let lists = board.lists;
      let index = lists.findIndex( l => l.id === id);
      let newLists =
      [
        ...lists.slice(0, index),
        ...lists.slice(index + 1, lists.length)
      ]
      board.lists = newLists
      this.setState({ board });
    }).fail( data => {
      console.log(data);
    })
  }

  editItem(index) {
    // debugger
    let list = this.list( list => {
      return list
      this.setState({ list })
    })
    // let list = this.state.board.lists.map( (list, i) => {
    //   if (i === index)
    //   return list
    // });
  }

  render() {
    return(
      <div id="show-modal" className="modal modal-fixed-footer">
        <div className="modal-content">
          {this.modalDisplay()}
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
        </div>
      </div>
    );
  }
}
