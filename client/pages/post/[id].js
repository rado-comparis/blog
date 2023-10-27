import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Comment from "../comments/comment";
import Container from "../../components/container";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [currentPost, setData] = useState([]);

  useEffect(() => {
    if (id) {
      // todo move to api folder
      fetch(`/posts/${id}`)
        .then((res) => res.json())
        .then((data) => { 
          setData(data.data);
        });
      }
  }, [id]);


    return(
    <Container>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article>
            <header>
              <h1>{currentPost.title}</h1>
              <div>
                {currentPost.username}
              </div>
              <div>
                {currentPost.text}
              </div>
              {currentPost.comments ? (
                <div>
                  <Comment comments={currentPost.comments} />
              </div>
              ) : null}
            </header>
          </article>
        </div>
      )}
    </Container>);
  }