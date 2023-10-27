export default function Comment({ comments }) {
  
    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>{comment.text}</div>
            ))}
        </div>
    )
  }