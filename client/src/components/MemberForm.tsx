import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { IMember } from '../models/IMember';
import {useHistory } from 'react-router-dom';
import { uuid } from 'uuidv4';
import {connect} from 'react-redux';
import { IRootState } from '../redux/members/reducer';
import { AddMembers } from '../redux/members/actions';
import { Form as FinalForm, Field } from 'react-final-form'

import {combineValidators, isRequired, composeValidators, hasLengthGreaterThan, isNumeric} from 'revalidate';
import TextInput from './custom/TextInput';
import TextAreaInput from './custom/TextAreaInput';


interface IProps 
{
  AddMembers: (member: IMember) => void,
  loading: boolean
}

const validate = combineValidators({
  firstname: isRequired("Please enter first name"),
  lastname: isRequired({message: "Please enter last name"}),
  email: composeValidators(
    isRequired({message: "Please enter valid email"}),
  )(),
  telephone: composeValidators(
    isRequired({message: "Please enter numeric telephone"}),
    isNumeric({message: "Please enter numeric telephone"})
    )() ,
  about: composeValidators(
      isRequired({message: "Please enter about yourself"}),
      hasLengthGreaterThan(10)({message:"Please enter more than 10 characters about you"})
  )(),
  message: composeValidators(
    isRequired({message: "Please enter some message"}),
    hasLengthGreaterThan(10)({message:"Please enter more than 10 characters message"})
)(),
})


const MemberForm: React.FC<IProps> = (props) => {

  const history = useHistory();

   const getMemberInfo = () => {
      return {
        _id:'',
        firstname:'',
        lastname:'',
        email:'',
        telephone:'',
        about:'',
        message:''
      }
  }
  const [member, setMember] = useState<IMember>(getMemberInfo())

    const handleFinalFormSubmit = (member: IMember) => {
    member._id = uuid();
    props.AddMembers(member);
    history.push('/');
  }

  return (
    <FinalForm onSubmit={handleFinalFormSubmit}
    validate={validate}
      render={({handleSubmit}) => (
        <Form onSubmit={handleSubmit}>
          <div className="formControl">
            <label>First Name</label>
              <Field name="firstname" component={TextInput} placeholder="First Name" value={member?.firstname} />
          </div>
          <div className="formControl">
            <label>Last Name</label>
              <Field name="lastname" component={TextInput} placeholder="Last Name" value={member?.lastname} />
          </div>
          <div className="formControl">
            <label>Email</label>
              <Field name="email" component={TextInput} placeholder="Email" value={member?.email} />
          </div>
          <div className="formControl">
            <label>Telephone</label>
              <Field name="telephone" component={TextInput} placeholder="Telephone" value={member?.telephone} />
          </div>

          <div className="formControl">
            <label>About</label>
              <Field name="about" component={TextAreaInput} placeholder="'Tell us more about you..." value={member?.about} />
          </div>
          <div className="formControl">
            <label>Message</label>
              <Field name="message" component={TextAreaInput} placeholder="Write some message..." value={member?.message} />
          </div>
          <div>
            <Button>Submit</Button>
          </div>

          
        </Form>
      )}
/>

  )
}

const mapStateToProps = (state: IRootState, ownProps: any) => {
  const {loading} = state.membersReducer;
  return {
    loading
  }
}
  

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    AddMembers: (member: IMember) => dispatch(AddMembers(member)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberForm)
