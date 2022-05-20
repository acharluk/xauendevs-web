import Head from 'next/head'
import Image from 'next/image'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Header from 'components/Header'
import WhoWeAre from 'components/Whoweare'
import Charlantes from 'components/Charlantes'
export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <WhoWeAre />
      <Charlantes />
    </>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync('posts')
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '')
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8')
    const { data: frontmatter } = matter(readFile)

    return {
      slug,
      frontmatter
    }
  })

  return {
    props: {
      posts
    }
  }
}
