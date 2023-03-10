import "./App.css";
import json from "./data";
import { useState } from "react";

import Comment from "./components/Comment/Comment";
import NewComment from "./components/NewInput/NewComment";
import DeleteModal from "./components/DeleteModal/DeleteModal";
let currentId = 5;

function App() {
  const [data, setData] = useState(json);
  const [deleteComment, setDeleteComment] = useState(false);

  const addNewReply = (id, content) => {
    let temp = data;
    currentId += 1;
    for (let comment of temp.comments) {
      if (comment.id === id) {
        comment.replies.push({
          id: currentId + 1,
          content: content,
          createdAt: "Just now",
          score: 0,
          replyingTo: comment.user.username,
          user: { ...data.currentUser },
        });
        break;
      }
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === id) {
            comment.replies.push({
              id: currentId + 1,
              content: content,
              createdAt: "Just now",
              score: 0,
              replyingTo: reply.user.username,
              user: { ...data.currentUser },
            });
            break;
          }
        }
      }
    }
    setData({ ...temp });
  };

  const updateScore = (id, action) => {
    let temp = data;
    for (let comment of temp.comments) {
      if (comment.id === id) {
        action == "upvote" ? (comment.score += 1) : (comment.score -= 1);
        break;
      }
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === id) {
            action == "upvote" ? (reply.score += 1) : (reply.score -= 1);
            break;
          }
        }
      }
    }
    setData({ ...temp });
  };

  const updateComment = (updatedContent, id) => {
    let temp = data;
    for (let comment of temp.comments) {
      if (comment.id === id) {
        comment.content = updatedContent;
        break;
      }
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === id) {
            reply.content = updatedContent;
            break;
          }
        }
      }
    }
    setData({ ...temp });
  };

  const addNewComment = (content) => {
    let temp = data;
    currentId += 1;
    temp.comments.push({
      id: currentId + 1,
      content: content,
      createdAt: "Just now",
      score: 0,
      user: { ...data.currentUser },
      replies: [],
    });
    setData({ ...temp });
  };

  return (
    <>
      {deleteComment !== false && (
        <DeleteModal
          id={deleteComment}
          setDeleteComment={setDeleteComment}
          setData={setData}
          data={data}
        />
      )}

      <main className="comments-column">
        <NewComment
          addNewComment={addNewComment}
          currentUser={data.currentUser}
        />
        {data.comments.map((comment) => {
          return (
            <Comment
              replyingTo=""
              addNewReply={addNewReply}
              updateComment={updateComment}
              setDeleteComment={setDeleteComment}
              updateScore={updateScore}
              key={comment.id}
              currentUser={data.currentUser}
              comment={comment.content}
              image={comment.user.image.png}
              username={comment.user.username}
              timeSince={comment.createdAt}
              score={comment.score}
              replies={comment.replies}
              id={comment.id}
            />
          );
        })}
      </main>
    </>
  );
}

export default App;
