import ReactMarkdown from 'react-markdown'
import rehypeHeight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

import { cn } from '@/lib/utils'

import 'highlight.js/styles/atom-one-dark.css'

type Props = {
  content?: string
  className?: string
}

const Markdown = ({ content, className }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHeight]}
      className={cn(
        'w-full max-w-none h-full prose prose-zinc prose-base prose-img:rounded-md prose-table:border prose-td:text-center prose-pre:bg-black/80 dark:prose-pre:bg-white/15 dark:prose-invert',
        className
      )}
    >
      {content}
    </ReactMarkdown>
  )
}

export default Markdown