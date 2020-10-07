import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const EditComment = ({commentInfo}) => {
  const history = useHistory();
  const currentUserId = useSelector(state => state.sessionReducer.userid);
  const [ratingOption, setRatingOption] = useState(commentInfo.rating);
  const [comment, setComment] = useState(commentInfo.comment || "");
  // console.log(commentInfo)

  const handleChangeRating = (e) => {
    setRatingOption(e.target.value);
  }

  const updateComment = async e => {
    e.preventDefault();
    try {
      if (currentUserId === commentInfo.userid) {
        const body = { comment, ratingOption };
        console.log(body)
        const response = await fetch(`/details/${commentInfo.book_id}/${commentInfo.userid}/${commentInfo.review_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
        console.log(response);
        
        history.go(0);
        // window.location = `/details/${commentInfo.book_id}`;
      } else {
        alert("You can only edit your own comments!")
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Fragment>
      {/* <button onClick={() => editComment(userid)} className="btn btn-warning mr-2 float-right">Edit</button> */}
      <button type="button" className="btn btn-sm btn-warning mr-1 float-right" data-toggle="modal" data-target={`#review_id${commentInfo.review_id}`}>
          Edit
      </button>

      <div className="modal fade" id={`review_id${commentInfo.review_id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Comment</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="form-group ml-3 mr-3">
                    <label htmlFor="Rating">Rating</label>
                    <select value={ratingOption} className="form-control" id="Rating" name="rating" onChange={handleChangeRating}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
            <div className="modal-body">
              <textarea type="text" className="form-control" value={comment} onChange={e => setComment(e.target.value)}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={e => updateComment(e)}>Save changes</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditComment;