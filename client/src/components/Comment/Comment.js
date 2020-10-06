import React from 'react';
import EditComment from '../EditComment/EditComment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

function Comment({ comment }) {
  const history = useHistory();
  const currentUserId = useSelector(state => state.sessionReducer.userid);

  const deleteComment = async userid => {
    // console.log("comment user Id: " + userid)
    // console.log("Logged In User Id: " + currentUserId)
    try {
      if (currentUserId === userid) {
        if (window.confirm('Are you sure you wish to delete this comment?')) {
          const deleteComment = await fetch(`/details/${comment.book_id}/${userid}`, {
            method: "DELETE"
          });
          
          history.go(0);
          // window.location = `/details/${comment.book_id}`;
        }
      } else {
        alert(`You can only delete your own comments! This comment by userID: ${userid}, yourID: ${currentUserId}`)
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">
            <button onClick={() => deleteComment(comment.userid)} className="btn btn-danger mr-2 float-right">Delete</button>
            <EditComment commentInfo={comment} />
            <span className="badge badge-info">{comment.firstname} {comment.lastname}</span>
            {comment.rating === 5 ? <span className="badge badge-success float-left">rated {comment.rating}</span>
          : comment.rating === 4 || comment.rating === 3 ? <span className="badge badge-warning float-left">rated {comment.rating}</span>
          : <span className="badge badge-danger float-left">rated {comment.rating}</span>}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted"><span className="badge badge-info">{comment.email}</span></h6>
          <p className="card-text mt-3 alert alert-info">{comment.comment}</p>
        </div>
      </div>
  )
};

export default Comment;