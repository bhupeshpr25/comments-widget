import { useEffect, useState } from "react";
import NewReply from "../NewInput/NewReply";
import "./comment.css";

export default function Comment({
  id,
  currentUser,
  replyingTo,
  comment,
  image,
  username,
  timeSince,
  score,
  replies,
  updateScore,
  updateComment,
  setDeleteComment,
  addNewReply,
}) {
  const [newReply, setNewReply] = useState(false);
  const [vote, setVote] = useState(false);
  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    const curr = username === currentUser.username;
    setCurrent(curr);
  }, [currentUser, username]);

  return (
    <>
      {
        <div className="comment">
          <div className="contentColumn">
            <div className="commentHeader">
              <img className="avatar" src={image} alt="avatar" />
              <div className="username">{username}</div>
              {current ? <div className="userTag">you</div> : ""}
              {replyingTo.length > 0 ? (
                <span className="reply-username">
                  {" "}
                  <img src="./assets/reply.svg" alt="" />
                  {replyingTo}{" "}
                </span>
              ) : (
                ""
              )}
              <div className="timestamp">{timeSince}</div>
            </div>

            {edit !== false ? (
              <>
                <div className="updateInput">
                  <textarea
                    defaultValue={edit}
                    onChange={(e) => {
                      setEdit(e.target.value);
                    }}
                    className="replyInput"
                    placeholder="Add a comment..."
                  />
                </div>

                <div className="updateRow">
                  <button
                    className="updateButton"
                    onClick={() => {
                      updateComment(edit, id);
                      setEdit(false);
                    }}
                  >
                    UPDATE
                  </button>
                </div>
              </>
            ) : (
              <div className="commentContent">{comment}</div>
            )}
          </div>{" "}
          <div className="scoreColumn">
            {
              // disable votes for user's own comment
              current ? (
                <>
                  <span className="score">{score}</span>
                  <img
                    className="upvote disabled-upvote"
                    src="./assets/upvote.svg"
                    alt="upvote"
                  />
                  <img
                    className="downvote disabled-upvote"
                    src="./assets/downvote.svg"
                    alt="downvote"
                  />
                </>
              ) : (
                <>
                  <span className="score">{score}</span>
                  <img
                    className="upvote"
                    src="./assets/upvote.svg"
                    alt="upvote"
                    onClick={() => {
                      if (!vote) {
                        updateScore(id, "upvote");
                        setVote(true);
                      }
                    }}
                  />

                  <img
                    className="downvote"
                    src="./assets/downvote.svg"
                    alt="downvote"
                    onClick={() => {
                      if (!vote) {
                        updateScore(id, "downvote");
                        setVote(true);
                      }
                    }}
                  />
                </>
              )
            }
            {current ? (
              edit !== false ? (
                <>
                  <div className="deleteButton disabled">
                    <img src="./assets/icon-delete.svg" alt="" />
                    <span> Delete</span>
                  </div>
                  <div className="editButton disabled">
                    <img src="./assets/icon-edit.svg" alt="" />
                    <span> Edit</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="editButton" onClick={() => setEdit(comment)}>
                    <span> Edit</span>
                  </div>
                  <div
                    className="deleteButton"
                    onClick={() => setDeleteComment(id)}
                  >
                    <span> Delete</span>
                  </div>
                </>
              )
            ) : (
              <>
                <div
                  className="replyButton"
                  onClick={() => {
                    setNewReply(true);
                  }}
                >
                  <span> Reply</span>
                </div>
                <div className="shareButton">Share</div>
              </>
            )}
          </div>
        </div>
      }
      {newReply !== false && (
        <NewReply
          parentId={id}
          replyingTo={username}
          setNewReply={setNewReply}
          addNewReply={addNewReply}
          currentUser={currentUser}
        />
      )}
      {replies?.length > 0 &&
        replies.map((reply) => {
          return (
            <div className="commentReplies">
              <div className="verticalLine"></div>
              <Comment
                replyingTo={reply.replyingTo}
                addNewReply={addNewReply}
                updateComment={updateComment}
                setDeleteComment={setDeleteComment}
                updateScore={updateScore}
                key={reply.id}
                currentUser={currentUser}
                comment={reply.content}
                image={reply.user.image.png}
                username={reply.user.username}
                timeSince={reply.createdAt}
                score={reply.score}
                replies={reply.replies}
                id={reply.id}
              />
            </div>
          );
        })}
    </>
  );
}
