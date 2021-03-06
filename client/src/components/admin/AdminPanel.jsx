import React from 'react';
import PendingApprovalList from './PendingApprovalList.jsx';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import EditForm from './EditForm.jsx';
import moment from 'moment';
import axios from 'axios';
const imageStyle = {
  width: '100%',
  height: '400px',
  overflow: 'hidden'
}
class AdminPanel extends React.Component {
  constructor(props) {
    console.log('creating admin panel');
    super(props);
    this.state = {
      category: '',
      users: [],
      response: false
    };
  }

  componentWillMount() {
    //check if user is logged
    if (!this.props.currentUser) {
      this.context.router.push('/');
    }
    this.setState({
      response: false
    });
    axios.get('/' + this.props.params.challengeId + '/admin/getChallengers')
      .then((usersForThisChallenge) => {
        this.setState({
          users: usersForThisChallenge.data.challengers,
          response: true
        });
      })
      .catch((err) => console.log(err));
  }

  deleteChallengeClick(e) {
    e.preventDefault();
    this.props.deleteChallenge(this.props.params.challengeId);
  }

  render() {
    // get challenge id from url
    console.log('rendering admin pannel');
    const id = this.props.params.challengeId;
    console.log('id', id);
    // get challeng info from entities
    const challenge = this.props.entities.challenges[id];
    console.log('players on this card', this.props.playersOfUserChallenges[id])
    console.log('now rendering', challenge);

    let list;
    if (!this.state.response) {
      list = (<div>waiting on data</div>);
    } else {
      console.log('found peeps, ', this.state.users);
      list = (<PendingApprovalList challengeId={id} players={this.state.users} handleClick={this.props.adminClick.bind(null, id)} entities={this.props.entities} />);
    }
    return (
      <Card className="admin-card">
        <CardHeader
          title="ADMIN PANEL"
          subtitle=""
          avatar="user-profile-image"
        />
        <CardMedia style={imageStyle}>
          <img style={{ height: '400px', objectFit: 'contain' }} src={challenge.url} />
        </CardMedia>
        <CardTitle title={challenge.name} subtitle={challenge.category} />
        <CardText>
          <EditForm {...this.props} challenge={challenge}/>
          <div>{challenge.successes} out of {challenge.challengers} challengers have completed this challenge! </div>
          <div>Completed: {challenge.successNames}</div>
          <br />
          <div>Start: {moment(challenge.createdAt).format("MM/DD/YY")} </div>
          <div>End: {moment(challenge.endTime).format("MM/DD/YY")} </div>
          <a href={'/' + id + '/delete'}><RaisedButton label="Delete this challenge" backgroundColor="#e22114"/></a>
          <div>List goes below</div>
          {list}
        </CardText>
      </Card>
    );
  }
}

AdminPanel.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default AdminPanel;
