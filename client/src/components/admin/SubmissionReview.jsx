import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const imageStyle = {
  width: '100%',
  height: '400px',
  overflow: 'hidden'
}

export default class SubmissionReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptedSubmission: false,
      rejectedSubmission: false
    };
  }

  handleClick(e){
    e.preventDefault();
    if (e.currentTarget.value === "Accept"){
      console.log('submission accepted');
      this.setState({
        acceptedSubmission: true
      });
    } else {
      console.log('submission rejected');
      this.setState({
        rejectedSubmission: true
      });
    }
    // this.props.history.router.push('/');
  }

  render() {
    const id = this.props.params.challengeId;
    const challenge = this.props.entities.challenges[id];
    let acceptLabel = this.state.acceptedSubmission ? 'ACCEPTED' : 'ACCEPT';
    let rejectLabel = this.state.acceptedSubmission ? 'REJECTED' : 'REJECT';
    let hideAccept = this.state.rejectedSubmission ? 'hidden' : '';
    let hideReject = this.state.acceptedSubmission ? 'hidden' : '';
    console.log(hideReject, 'hideReject');
    return (
      <Card className="submission-card">
        <CardHeader
          title="SUBMISSION REVIEW"
          subtitle=""
          avatar="user-profile-image"
        />
        <CardMedia style={imageStyle}>
          <img style={{ height: '400px', objectFit: 'contain' }} src={challenge.url} />
        </CardMedia>
        <CardTitle title={challenge.name} subtitle={challenge.category} />
        <div>THEIR SUBMISSION INFO HERE</div>
        <CardText>
          <div className="row">
            <div className={"col s3 " + hideAccept}>
              <RaisedButton
                label={acceptLabel}
                backgroundColor="#31a81d"
                value="Accept"
                onClick={this.handleClick.bind(this)}/>
            </div>
            <div className={"col s3 " + hideReject}>
              <RaisedButton
                label={rejectLabel}
                value="Reject"
                backgroundColor="#bf302b"
                onClick={this.handleClick.bind(this)}/>
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}
