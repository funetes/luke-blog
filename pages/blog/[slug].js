import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import Link from "next/link";
const PostPage = ({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) => {
  return (
    <>
      <Link href="/">
        <a className="btn btn-back">Go Back</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">Posted on {date}</div>
        <img src={cover_image} alt="cover image" />
        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
};

export default PostPage;

// get post path
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  // filename
  const paths = files.map((file) => ({
    params: { slug: file.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

// get post data
export async function getStaticProps({ params: { slug } }) {
  const makrdownWithMata = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(makrdownWithMata);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
