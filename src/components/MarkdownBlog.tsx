'use client'
import { FC } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'

export const MarkdownBlog: FC<{ content: string }> = ({ content }) => {
  return (
    <div className='prose prose-stone lg:prose-lg dark:prose-invert'>
      <h1>Blog Title</h1>
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  )
}
