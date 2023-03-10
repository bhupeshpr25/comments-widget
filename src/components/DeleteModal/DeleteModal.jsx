import "./deleteModal.css";

export default function DeleteModal({ id, setDeleteComment, setData, data }) {
  const deleteComment = () => {
    for (let comment of data.comments) {
      if (comment.id === id) {
        const updatedComments = data.comments.filter(
          (comment) => comment.id !== id
        );
        setData((data) => ({
          currentUser: { ...data.currentUser },
          comments: updatedComments,
        }));
        break;
      }
      if (comment.replies.length > 0) {
        for (let reply of comment.replies) {
          if (reply.id === id) {
            const updatedReplies = comment.replies.filter(
              (reply) => reply.id !== id
            );

            comment.replies = updatedReplies;

            setData((data) => ({
              currentUser: { ...data.currentUser },
              comments: data.comments,
            }));
            break;
          }
        }
      }
    }
    setDeleteComment(false);
  };

  return (
    <div className="modalBackground">
      <div className="modal">
        <div className="modalTitle">Delete comment?</div>
        <div>This action cannot be undone</div>
        <div className="buttonsRow">
          <span id="cancel" onClick={() => setDeleteComment(false)}>
            Cancel
          </span>
          <span id="confirm" onClick={() => deleteComment()}>
            Delete
          </span>
        </div>
      </div>
    </div>
  );
}
