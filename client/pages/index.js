import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Container from "../components/container";

export default function Home() {

  const [allPosts, setData] = useState([]);
// todo move to api folder
  useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => { 
        setData(data.data);
       });
  }, [allPosts]);

  return (
    <Container>
      <Head>
        <title>Blog test app</title>
      </Head>

          {allPosts.length ? (
          allPosts.map((post) => (
            <article key={post.id}>
              <Link
                as={`/post/${post.id}`}
                href="/post/[id]]"
              >
                {post.title}
              </Link>
              <p>{post.text}</p>
              <div>
                <p>Number of comments: {post.comments.length}</p>
              </div>
            </article>
          ))
          ) : (
            <p>No blog</p>
          )}
    </Container>
  );
}
