import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DirectiveNode = any;

let processor: ReturnType<typeof createProcessor> | null = null;

/**
 * Remark plugin that wraps **Before** / **After** adjacent paragraphs
 * into a comparison card container so they render as a visual pair.
 */
function remarkBeforeAfter() {
  return (tree: DirectiveNode) => {
    const { children } = tree;
    if (!children) return;

    const grouped: DirectiveNode[] = [];
    let i = 0;

    while (i < children.length) {
      const node = children[i];

      // Check if this paragraph starts with **Before** or **After**
      if (
        node.type === 'paragraph' &&
        node.children?.[0]?.type === 'strong' &&
        node.children[0].children?.[0]?.type === 'text'
      ) {
        const text = node.children[0].children[0].value;
        const isBefore = /^before/i.test(text);
        const isAfter = /^after/i.test(text);

        // Check if there's a subsequent paragraph that completes the pair
        if (isBefore && i + 1 < children.length) {
          const next = children[i + 1];
          if (
            next.type === 'paragraph' &&
            next.children?.[0]?.type === 'strong' &&
            next.children[0].children?.[0]?.type === 'text' &&
            /^after/i.test(next.children[0].children[0].value)
          ) {
            // Wrap both in a comparison container
            grouped.push({
              type: 'paragraph',
              data: {
                hProperties: { className: 'comparison-pair' },
              },
              children: [
                {
                  type: 'html',
                  value: `<div class="comparison-before">
                    <span class="comparison-label comparison-label-before">Before</span>
                    `,
                },
                // Content after **Before**:
                ...(node.children.slice(1).length > 0
                  ? [{ type: 'html', value: renderChildren(node.children.slice(1)) }]
                  : []),
                {
                  type: 'html',
                  value: `</div>\n<div class="comparison-after">
                    <span class="comparison-label comparison-label-after">After</span>
                    `,
                },
                // Content after **After**:
                ...(next.children.slice(1).length > 0
                  ? [{ type: 'html', value: renderChildren(next.children.slice(1)) }]
                  : []),
                {
                  type: 'html',
                  value: `</div>`,
                },
              ],
            });
            i += 2;
            continue;
          }
        }
      }

      grouped.push(node);
      i++;
    }

    tree.children = grouped;
  };
}

/** Simple mdast children to inline text */
function renderChildren(children: DirectiveNode[]): string {
  return children
    .map((child: DirectiveNode) => {
      if (child.type === 'text' || child.type === 'inlineCode') return child.value;
      if (child.type === 'strong')
        return `<strong>${renderChildren(child.children)}</strong>`;
      if (child.type === 'emphasis')
        return `<em>${renderChildren(child.children)}</em>`;
      if (child.type === 'link')
        return `<a href="${child.url}">${renderChildren(child.children)}</a>`;
      if (child.type === 'code')
        return `<code>${child.value}</code>`;
      return '';
    })
    .join('');
}

function createProcessor() {
  return remark()
    .use(remarkGfm)
    .use(remarkBeforeAfter)
    .use(remarkDirective)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .use(remarkHtml as any, {
      sanitize: false,
      handlers: {
        // Handle containerDirective (:::tip, :::warning, etc.)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        containerDirective(node: DirectiveNode, render: (children: any[]) => string) {
          const type = (node.name as string) || 'note';
          const content = render(node.children as []);
          return `<div class="callout callout-${type}">\n${content}\n</div>`;
        },
      },
    } as any);
}

export function getMarkdownProcessor() {
  if (!processor) {
    processor = createProcessor();
  }
  return processor;
}

export async function renderMarkdown(content: string): Promise<string> {
  const proc = getMarkdownProcessor();
  const result = await proc.process(content);
  return String(result.value);
}
