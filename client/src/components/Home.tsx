import React, {useEffect} from 'react'
import { Card } from 'semantic-ui-react'
import { IMember } from '../models/IMember';
import CardContainer from './custom/CardContainer';
import {connect} from 'react-redux';
import { IRootState } from '../redux/members/reducer';
import { GetMembers } from '../redux/members/actions';

interface IProps 
{
  members: IMember[] | undefined,
  GetMembers: () => any,
  loading: boolean,
  error: string
}

const Home: React.FC<IProps> = ({GetMembers, error, loading, members}) => {
  useEffect(() => {
    GetMembers()
  }, [GetMembers])

  if (error !== undefined)
  {
    return (<h1 style={{textAlign:"center", marginTop:"300px"}}>
      Error
    </h1>)
  }
  if (loading)
    return (<h1 style={{textAlign:"center", marginTop:"300px"}}>
      Loading...
    </h1>)
  return (
    members?.length ? (<Card.Group>
      {members?.map(data => (<CardContainer key={data._id.toString()} member={data} />))}
    </Card.Group>) : (<h1>No members found, click <a href='/members'>here</a> to add member</h1>)

  )
}

const mapStateToProps = (state: IRootState) => {
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
