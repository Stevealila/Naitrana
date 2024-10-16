import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css'; 

const CustomReactMarkdown = ({ content }:{ content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      className="markdown-body" 
    >
      { content }
    </ReactMarkdown>
  );
};

export default CustomReactMarkdown;
