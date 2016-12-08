class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = { edit: false };
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.edit = this.edit.bind(this);
  }

  edit() {
    let list = this.props.list;
    return(
      <form onSubmit={this.handleEdit}>
        <input type='text' defaultValue={list.title} ref='title' />
        <button className='btn green' type='submit'>Submit</button>
      </form>
    )
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  handleEdit(e) {
    e.preventDefault()
    let { title } = this.refs;
    let inputValue = {title: title.value};
    $.ajax({
      url: `/boards/${this.props.boardId}/lists/${this.props.list.id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: {list: {title: title.value}}
    }).success( list => {
      this.toggleEdit();
      this.props.editItem(this.props.index);
    }).fail( data =>{
      console.log(data)
    })
  }

  render() {
    if(!this.state.edit) {
      return(
        <div>
          {this.props.list.title}
          <button className='btn green' onClick={this.toggleEdit}>Edit</button>
          <button className='btn red'  onClick={(e) => this.props.deleteList(e, this.props.list.id, this.props.boardId) }>Delete</button>
        </div>
      )
    } else {
      return(
        this.edit()
      )
    }
  }
}
