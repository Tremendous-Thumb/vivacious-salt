import {TextField, SelectField, RaisedButton, MenuItem} from 'material-ui';
import React from 'react';
export default class EditForm extends React.Component{
  constructor(props) {
    super(props);
    const id = this.props.params.challengeId;
    const challenge = this.props.entities.challenges[id];
    this.state = {
      name: challenge.name,
      description: challenge.description,
      type: challenge.type,
      url: challenge.url,
      reward: challenge.reward || ''
    }
    this.id = this.props.params.challengeId;
  }
  handleFormChanges(e) {
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCategoryChange(e, i, val) {
    this.setState({
      type: val
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    var newChallenge = {
      userId: this.props.currentUser.id,
      name: this.state.name,
      description: this.state.description,
      type: this.state.type,
      url: this.state.url,
      reward: this.state.reward
    };
    console.log(newChallenge);
    this.props.updateChallenge(newChallenge, this.id);
    browserHistory.push('/');
  }

  render() {
    const id = this.props.params.challengeId;
    const challenge = this.props.entities.challenges[id];
    const categories = [
    { value: 'online', label: 'Online' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'food', label: 'Food' },
    { value: 'social', label: 'Social' },
    { value: 'other', label: 'Other' }
    ];
    return (
      <div className="row formDiv">
        <form
          name="challenge-create"
          onSubmit={this.handleSubmit.bind(this)}
          className="col s10 offset-s1" >
          <p className="center-align"> Edit your challenge below: </p>
          <TextField
            value={this.state.name}
            floatingLabelText="Challenge Name"
            name="name"
            floatingLabelFixed={true}
            onChange={this.handleFormChanges.bind(this)}
          />
          <br />
          <TextField
            value={this.state.description}
            name="description"
            floatingLabelText="Challenge Description"
            floatingLabelFixed={true}
            onChange={this.handleFormChanges.bind(this)}
          />
          <br />
          <SelectField
            floatingLabelText="Challenge Category"
            value={this.state.type}
            onChange={this.handleCategoryChange.bind(this)}
            name="type" >
            {categories.map((category, i) => {
              return (
                <MenuItem key={i} value={category.value} primaryText={category.label} />
              );
            })}
          </SelectField>
          <br />

          $<TextField
            value={this.state.reward}
            floatingLabelText="Challenge Reward"
            name="reward"
            floatingLabelFixed={true}
            onChange={this.handleFormChanges.bind(this)}
          />
          <br />

          <TextField
            value={this.state.url}
            name="url"
            floatingLabelText="Challenge Image"
            floatingLabelFixed={true}
            onChange={this.handleFormChanges.bind(this)}
          />
          <br />
          <div className="center-align">
            <RaisedButton label="Submit!" backgroundColor="#fdd835" onClick={this.handleSubmit.bind(this)} type="submit"/>
          </div>
        </form>
      </div>
    )
  }
}
