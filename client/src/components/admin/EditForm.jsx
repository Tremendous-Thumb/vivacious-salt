import {TextField, SelectField, RaisedButton, MenuItem} from 'material-ui';
import React from 'react';
export default class EditForm {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    var newChallenge = {
      userId: this.props.currentUser.id,
      name: this.refs.name.value,
      description: this.refs.description.value,
      type: this.state.category,
      url: this.refs.image.value
    };
    console.log(newChallenge);
    this.props.updateChallenge(newChallenge);
    browserHistory.push('/');
  }

  render() {
    const id = props.params.challengeId;
    const challenge = props.entities.challenges[id];
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
          onSubmit={props.handleSubmit}
          className="col s10 offset-s1" >
          <p className="center-align"> Edit your challenge below: </p>
          <TextField
            hintText={challenge.name}
            floatingLabelText="Challenge Name"
            refs="name"
            floatingLabelFixed={true}
          />
          <br />
          <TextField
            hintText={challenge.description}
            floatingLabelText="Challenge Description"
            multiLine={true}
            refs="description"
            rows={2}
            floatingLabelFixed={true}
          /><br />

          <div className="input-field">
            <SelectField
              hintText={challenge.category}
              floatingLabelText="Challenge Category"
              refs="category"
              onChange={props.handleCategory} >
              {categories.map((category, i) => {
                return (
                  <MenuItem key={i} value={category.value} primaryText={category.label} />
                );
              })}
            </SelectField>
          </div>
          <TextField
            hintText={challenge.url}
            floatingLabelText="Challenge Image"
            floatingLabelFixed={true}
            refs="url"
          />
          <br />
          <div className="center-align">
            <RaisedButton label="Submit!" backgroundColor="#fdd835" onClick={this.handleSubmit} type="submit"/>
          </div>
        </form>
      </div>
    )
  }
}
