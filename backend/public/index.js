class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true, data: {_source: {f_name: 'Not Set'}} };

    // This binding is necessary to make `this` work in the callback
      // this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    fetch('http://localhost:3030/user/4')
    .then(response => response.json())
    .then((json) => {
      this.setState({ data: json });
    });
  };

  changeValue = (key, event) => {
    console.log("-----", key, event.target.value);
    var data  = this.state.data._source;
    data[key] = event.target.value;
    this.setState({data: { _source: data}});
  };

  renderData = () => {
    console.log("RenderData");
    const inputs = Object.keys(this.state.data._source)
      .map((key) =>
        <p key={key}>
        {key} - <input type="text" defaultValue={this.state.data._source[key]} onChange={this.changeValue.bind(this, key)}/>
        </p>

      );
      console.log(inputs);
      return (
        <div>
          {inputs}
        </div>
      );
  };

  updateInfo = () => {
      fetch('http://localhost:3030/user/4', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.data._source)
      })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
  };

  render = () => {
    return (
      <div>
        <button onClick={this.handleClick}>
          Fetch
        </button>
        {this.renderData()}
        <button onClick={this.updateInfo}>Update</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Button />,
  document.getElementById('root')
);
