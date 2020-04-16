import React, { useEffect } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { IMember } from '../models/IMember';
import {useHistory, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import { IRootState } from '../redux/members/reducer';
import { UpdateMember, FetchMember } from '../redux/members/actions';
import { Form as FinalForm, Field } from 'react-final-form'

import {combineValidators, isRequired, composeValidators, hasLengthGreaterThan, isNumeric} from 'revalidate';
import TextInput from './custom/TextInput';
import TextAreaInput from './custom/TextAreaInput';


interface IProps 
{
  UpdateMember: (member: IMember) => void,
  FetchMember: (id: string) => IMember,
  loading: boolean,
  member: IMember
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


const MemberEditForm: React.FC<IProps> = (props) => {

  const history = useHistory();

  const {id} = useParams();

  useEffect(() => {
    props.FetchMember(id!)
  }, [FetchMember, id])

    const {member} = props;

    const handleFinalFormSubmit = (member: IMember) => {
    member._id = id!
    props.UpdateMember(member);
    history.push('/');
  }

  return (
    <FinalForm onSubmit={handleFinalFormSubmit}
    validate={validate}
      render={({handleSubmit}) => (
        <Form onSubmit={handleSubmit}>
          <div className="formControl">
            <label>First Name</label>
              <Field name="firstname" component={TextInput} placeholder="First Name" value={member?.firstname} defaultValue={member?.firstname} />
          </div>
          <div className="formControl">
            <label>Last Name</label>
              <Field name="lastname" component={TextInput} placeholder="Last Name" value={member?.lastname} defaultValue={member?.lastname} />
          </div>
          <div className="formControl">
            <label>Email</label>
              <Field name="email" component={TextInput} placeholder="Email" value={member?.email} defaultValue={member?.email} />
          </div>
          <div className="formControl">
            <label>Telephone</label>
              <Field name="telephone" component={TextInput} placeholder="Telephone" value={member?.telephone} defaultValue={member?.telephone} />
          </div>

          <div className="formControl">
            <label>About</label>
              <Field name="about" component={TextAreaInput} placeholder="'Tell us more about you..." value={member?.about} defaultValue={member?.about} />
          </div>
          <div className="formControl">
            <label>Message</label>
              <Field name="message" component={TextAreaInput} placeholder="Write some message..." value={member?.message} defaultValue={member?.message} />
          </div>
          <div>
            <Button>Submit</Button>
          </div>

          
        </Form>
      )}
/>

  )
}

const mapStateToProps = (state: IRootState) => {
  const {loading, member} = state.membersReducer;
  return {
    loading,
    member
  }
}
  

const mapDispatchToProps = (dispatch: any) => {
  return {
    UpdateMember: (member: IMember) => dispatch(UpdateMember(member)),
    FetchMember: (id: string) => dispatch(FetchMember(id))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(MemberEditForm)
