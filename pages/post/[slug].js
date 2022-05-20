import fs from 'fs'
import matter from 'gray-matter'
import md from 'markdown-it'
import Head from 'next/head'

export default function Post({ frontmatter, content }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <div>
        <h1>Post</h1>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8')
  const { data: frontmatter, content } = matter(fileName)
  return {
    props: {
      frontmatter,
      content
    }
  }
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts')
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', '')
    }
  }))
  return {
    paths,
    fallback: false
  }
}
