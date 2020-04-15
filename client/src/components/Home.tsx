import React, {useEffect, useState} from 'react'
import { Card, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'
import axios from 'axios'
import { IMember } from '../models/IMember';
import CardContainer from './custom/CardContainer';
import {connect} from 'react-redux';
import { initialState } from '../redux/members/reducer';
import { GetMembers } from '../redux/members/actions';
import { Link } from 'react-router-dom';

interface IProps 
{
  members: IMember[],
  GetMembers: () => any,
  membersReducer: any,
  loading: boolean,
  error: string
}


const Home: React.FC<IProps> = (props) => {


  useEffect(() => {
    props.GetMembers()
  }, [GetMembers])

  if (props.error != undefined)
  {
    return (<h1 style={{textAlign:"center", marginTop:"300px"}}>
      Error
    </h1>)
  }
  if (props.loading)
    return (<h1 style={{textAlign:"center", marginTop:"300px"}}>
      Loading...
    </h1>)
  return (
    props.members?.length ? (<Card.Group>
      {props.members?.map(data => (<CardContainer key={data._id.toString()} member={data} />))}
    </Card.Group>) : (<h1>No members found, click <a href='/members'>here</a> to add member</h1>)

  )
}

const mapStateToProps = (state: initialState) => {
  const {loading, members, error} = state.membersReducer;
  return {
    loading,
    members,
    error
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    GetMembers: () => dispatch(GetMembers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
