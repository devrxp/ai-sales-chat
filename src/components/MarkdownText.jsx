import { makeMarkdownText } from '@assistant-ui/react-ui'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

/* eslint-disable no-unused-vars -- `node` é injetada pelo react-markdown e descartada de propósito */
const MarkdownText = makeMarkdownText({
  components: {
    // <div> no lugar de <p>: evita "<div> cannot be a descendant of <p>" quando a mensagem contém imagens
    p: ({ node, ...props }) => <div className="my-1 mb-3 leading-relaxed text-slate-700" {...props} />,

    img: ({ node, src, alt, ...props }) => (
      <span className="my-4 block">
        <Zoom zoomMargin={20}>
          <img
            src={src}
            alt={alt || 'Imagem enviada pelo assistente'}
            className="max-h-[300px] max-w-[90vw] cursor-zoom-in rounded-xl border border-slate-200 object-cover shadow-md transition-all hover:ring-2 hover:ring-blue-400 md:max-w-[400px]"
            loading="lazy"
            {...props}
          />
        </Zoom>
      </span>
    ),
  },
})
/* eslint-enable no-unused-vars */

export default MarkdownText
