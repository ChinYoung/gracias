'use client'
import { FC } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
import dayjs from 'dayjs'

export const MarkdownBlog: FC<{
  content: string
  title: string
  updatedAt: string
}> = ({ content, title, updatedAt }) => {
  return (
    <div className='prose prose-stone lg:prose-lg dark:prose-invert pb-10'>
      <h1>{title}</h1>
      <div className='mt-4 text-sm text-gray-500'>
        Updated at: {dayjs(updatedAt).format('MMMM D, YYYY')}
      </div>
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  )
}
