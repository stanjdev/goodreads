import React from 'react';
import EditComment from '../EditComment/EditComment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function Comment({ comment }) {
  const history = useHistory();
  const currentUserId = useSelector(state => state.sessionReducer.userid);

  const deleteComment = async userid => {
    // console.log("comment user Id: " + userid)
    try {
      if (currentUserId === userid) {
        if (window.confirm('Are you sure you wish to delete this comment?')) {
          // eslint-disable-next-line no-unused-vars
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
          <h5 className="card-title d-flex justify-content-between">
            <span className="badge badge-info">{comment.firstname} {comment.lastname[0]}<h6 className="card-subtitle mt-1 text-muted"><span className="badge badge-info">{comment.email}</span></h6></span>
            <div>
              <EditComment commentInfo={comment} />
              <button onClick={() => deleteComment(comment.userid)} className="btn btn-sm btn-danger ">Delete</button>
            </div>
          </h5>
          <div className="alert alert-info mt-2">
            {comment.rating === 5 ? <span className="badge badge-success float-left">rated: {comment.rating}/5</span>
          : comment.rating === 4 || comment.rating === 3 ? <span className="badge badge-warning float-left">rated: {comment.rating}/5</span>
          : <span className="badge badge-danger float-left">rated: {comment.rating}/5</span>}
            <p className="card-text mt-3 alert ">{comment.comment}</p>
          </div>
        </div>
      </div>
  )
};
