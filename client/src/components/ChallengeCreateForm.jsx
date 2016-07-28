import React from 'react';
import ImageUpload from './ImageUpload.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

// probably want to use redux-form instead
// http://redux-form.com/5.3.1/#/getting-started?_k=7i191c

class ChallengeCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      reward: ''
    };
    this.categories = [
      { value: 'online', label: 'Online' },
      { value: 'fitness', label: 'Fitness' },
      { value: 'food', label: 'Food' },
      { value: 'social', label: 'Social' },
      { value: 'other', label: 'Other' }
    ];
    // should probably use lodash's bindAll, this is ridiculous
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  componentWillMount() {
    //check if user is logged
    if(!this.props.currentUser) {
      this.context.router.push('/');
    }
  }

  handleCategory(event, index, value) {
    // using materialUI
    console.log(value);
    this.setState({
      category: value
    });
  }
  handleFormChanges(e) {
    this.setState({
      [e.target.name] = e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    var newChallenge = {
      userId: this.props.currentUser.id,
      name: this.refs.name.value,
      description: this.refs.description.value,
      type: this.state.category,
      url: this.refs.image.value,
      reward: this.state.reward
      // image: this.refs.image.value
    };

    console.log(newChallenge);

    this.props.createChallenge(newChallenge);
    browserHistory.push('/');
  }

  render() {
    return (
    <div className="row formDiv">
      <form
        name="challenge-create"
        onSubmit={this.handleSubmit}
        className="col s10 offset-s1" >
        <h3 className="center-align"> Create a challenge! </h3>
        <div className="input-field">
          <input
            className="validate"
            type="text"
            id="challenge_name"
            ref="name"
          />
          <label htmlFor="challenge_name">Challenge Name</label>
        </div>

        <div className="input-field">
          <textarea
            className="materialize-textarea"
            id="challenge_description"
            ref="description"
          />
          <label htmlFor="challenge_description">Challenge Description</label>
        </div>

        <div className="input-field">
          <SelectField
            value={this.state.category}
            floatingLabelText="Challenge Category"
            onChange={this.handleCategory} >
            {this.categories.map((category, i) => {
              return (
                <MenuItem key={i} value={category.value} primaryText={category.label} />
              );
            })}
          </SelectField>
        </div>

        <TextField
          value={this.state.reward}
          floatingLabelText="Challenge Reward"
          name="reward"
          floatingLabelFixed={true}
          onChange={this.handleFormChanges.bind(this)}
        />
        <br />
        <div className="input-field">
          <input
            className="validate"
            type="text"
            id="challenge_image"
            ref="image"
          />
          <label htmlFor="challenge_image">Challenge Image Url</label>
        </div>

        <div className="center-align">
          <RaisedButton label="Submit!" backgroundColor="#fdd835" onTouchTap={this.handleSubmit} type="submit"/>
        </div>
      </form>
    </div>
    );
  }
}

ChallengeCreateForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};
// if want to validate forms https://github.com/christianalfoni/formsy-react
/*
if want to use a file upload for the image rather than a image url
<div className="file-field input-field">
  <div className="btn">
    <span>Upload image</span>
    <input type="file" ref='image'/>
  </div>
  <div className="file-path-wrapper">
    <input className="file-path validate" type="text" />
  </div>
</div>
*/

export default ChallengeCreateForm;
