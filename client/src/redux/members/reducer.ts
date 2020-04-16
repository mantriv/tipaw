import { IMember } from '../../models/IMember';
import { LIST_MEMBERS, INITIATE_REQUEST, MEMBER_REQUEST_FAILUER, ADD_MEMBER, DELETE_MEMBER, FETCH_MEMBER } from './actionTypes';

export interface IRootState extends initialState
{
  membersReducer: any
}

export interface initialState {
  member?: IMember,
  members?: IMember[],
  loading: false,
  error: ''
}

const membersReducer = (state: initialState, action: any) => {

    switch (action.type) {
      case INITIATE_REQUEST: return {
        ...state,
        loading: true
      }

      case LIST_MEMBERS: return {
        ...state,
        loading: false,
        members: action.members
      }

      case FETCH_MEMBER: return {
        ...state,
        loading: true,
        member: action.payload
      }

      case ADD_MEMBER: return {
        ...state,
        loading: true,
        members: state.members?.push(action.member)
      }

      case DELETE_MEMBER: return {
        ...state,
        loading: false,
        members: state.members?.filter(x => x._id !== action.payload)
      }

      case MEMBER_REQUEST_FAILUER: return {
        ...state,
        loading: false,
        error: action.payload
      }

    
      default: return {
        ...state
      }

    }
  }

  export default membersReducer;