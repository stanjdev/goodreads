import React from 'react';

function Comment({ comment }) {
  return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title"><span className="badge badge-info">{comment.firstname} {comment.lastname}</span>
            {comment.rating === 5 ? <span className="badge badge-success float-right">rated {comment.rating}</span>
          : comment.rating === 4 || comment.rating === 3 ? <span className="badge badge-warning float-right">rated {comment.rating}</span>
          : <span className="badge badge-danger float-right">rated {comment.rating}</span>}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted"><span className="badge">@{comment.email}</span></h6>
          <p className="card-text mt-3 alert alert-info">{comment.comment}</p>
        </div>
      </div>
  )
};

export default Comment;