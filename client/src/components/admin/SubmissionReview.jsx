import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

export default class SubmissionReview extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e){
    e.preventDefault();
    if (e.target.value === "Accept"){
      console.log('submission accepted');
    } else {
      console.log('submission rejected');
    }
    this.context.router.push('/');
  }

  render() {
    <Card className="submission-card">
      <CardHeader
        title="SUBMISSION REVIEW"
        subtitle=""
        avatar="user-profile-image"
      />
      <CardMedia className="admin-image">
        <img className="admin-image" src={challenge.url} />
      </CardMedia>
      <CardTitle title={challenge.name} subtitle={challenge.category} />
      <div>THEIR SUBMISSION INFO HERE</div>
      <CardText>
        <div className="row">
          <div className="col s3">
            <RaisedButton
              label="Accept"
              backgroundColor="#31a81d"
              value="Accept"
              onClick={this.handleClick.bind(this)}/>
          </div>
          <div className="col s3">
            <RaisedButton
              label="Reject"
              value="Reject"
              backgroundColor="#bf302b"
              onClick={this.handleClick.bind(this)}/>
          </div>
        </div>
      </CardText>
    </Card>
  }
}
