import { IMember } from '../../models/IMember';
import { LIST_MEMBERS, ADD_MEMBER, FETCH_MEMBER, DELETE_MEMBER, UPDATE_MEMBER, MEMBER_REQUEST_FAILUER, INITIATE_REQUEST } from './actionTypes';
import axios from 'axios';
import swal from 'sweetalert';

const InitialRequest = () => {
  return {
    type: INITIATE_REQUEST
  }
}

const ListMember = (members: IMember[]) => {
  return {
    type: LIST_MEMBERS,
    members: members
  }
}

const GetRequestFaiure = (error: any) => {
  return {
    type: MEMBER_REQUEST_FAILUER,
    payload: error
  }
}

const AddMember = (member: IMember) => {
  return {
    type: ADD_MEMBER,
    member: member
  }
}

const GetMember = (member: IMember) => {
  return {
    type: FETCH_MEMBER,
    payload: member
  }
}

const DeleteMember = (id: string) => {
  return {
    type: DELETE_MEMBER,
    payload: id
  }
}

const EditMember = (member: IMember) => {
  return {
    type: UPDATE_MEMBER,
    payload: member
  }
}


export const GetMembers = () => {
  return (dispatch : any) => {
    dispatch(InitialRequest());
    axios.get<IMember[]>("/members")
        .then(response => {
          setTimeout(() => {dispatch(ListMember(response.data))}, 100)
        }).catch(error => {
          dispatch(GetRequestFaiure(error));
        })
    }
  }

  export const FetchMember = (id: string) => {
    return (dispatch : any) => {
      dispatch(InitialRequest());
      // alert('Fetch ' + id)
      axios.get<IMember>(`/members/${id}`).then((member) => {
        dispatch(GetMember(member.data))
      }).catch(error => {
        dispatch(GetRequestFaiure(error));
      })
      }
    }

  
  export const AddMembers = (member: IMember) => {
    return (dispatch : any) => {
      dispatch(InitialRequest());
      axios.post("/members", member)
          .then(response => {
            swal({
                  title: "Great!",
                  text: "Member saved successfully!",
                  icon: "success",
                })
            setTimeout(() => {dispatch(AddMember(member))}, 10);
            
          }).catch(error => {
            dispatch(GetRequestFaiure(error));
          })
      }
    }

    export const UpdateMember = (member: IMember) => {
      return (dispatch : any) => {
        dispatch(InitialRequest());
        axios.put("/members", member)
            .then(response => {
              swal({
                    title: "Great!",
                    text: "Member saved successfully!",
                    icon: "success",
                  })
              setTimeout(() => {dispatch(EditMember(member))}, 10);
              
            }).catch(error => {
              dispatch(GetRequestFaiure(error));
            })
        }
      }

    export const DeleteMembers = (id: string) => {
      return (dispatch : any) => {
        dispatch(InitialRequest());
        axios.delete(`/members/${id}`).then((success) => {
          swal({
            title: "Done!",
            text: "Member deleted successfully",
            icon: "success",
            timer: 2000
          }).then(() => {
            dispatch(DeleteMember(id))
          })  
        }).catch(error => {
          console.log(error)
        })
        }
      }

      