import React from 'react'
import { Card, Button, Image, Grid } from 'semantic-ui-react'
import { IMember } from '../../models/IMember';
import axios from 'axios';
import swal from 'sweetalert';
import { DeleteMembers } from '../../redux/members/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface IProps {
  member : IMember;
  DeleteMembers?: (id: string) => any,
  membersReducer?: any,
  loading?: boolean
}

const CardContainer: React.FC<IProps> = (props) => {
  const deleteHandler = (id: string) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this user?",
      icon: "warning",
      dangerMode: true,
      buttons: ["No", "Yes, delete it"],
    })
    .then(willDelete => {
      if (willDelete) {
        props.DeleteMembers!(id)
      }
    });
  }

  const {member} = props;

    return (
    <Card style={{width: "300px"}}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://www.w3schools.com/howto/img_avatar.png'
        />
        <Card.Header>{member.firstname} {member.lastname}</Card.Header>
        <Card.Meta>{member.telephone} / {member.email}</Card.Meta>
        <Card.Description>
          {member.about}
        </Card.Description>
        <Card.Description>
          {member.message}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red' onClick={() => deleteHandler(member._id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
    
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteMembers: (id: string) => dispatch(DeleteMembers(id))
  }
}

export default connect(null, mapDispatchToProps)(CardContainer)
