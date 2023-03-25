import mermaid from 'mermaid';

/**
 * Mermaid Chart
 */
const MermaidChart = (code: string) => {
  try {
    const needsUniqueId = 'render' + Math.random().toString(16).slice(2);
    const element = (sc: any) => {
      code = sc;
    };

    /**
     * Render
     */
    mermaid.mermaidAPI.render(needsUniqueId, code, element as any);

    return `<div class="mermaid">${code}</div>`;
  } catch (err: any) {
    return `<pre>${err.name}: ${err.message}</pre>`;
  }
};

/**
 * Mermaid Plugin
 */
const MermaidPlugIn = (md: any, opts: any) => {
  Object.assign(MermaidPlugIn.default, opts);
  const { token: _token, ...dictionary } = MermaidPlugIn.default.dictionary as any;

  /**
   * Initialize
   */
  mermaid.initialize(MermaidPlugIn.default);

  /**
   * Replace
   */
  const replacer = (_: any, p1: string, p2: string, p3: string) => {
    p1 = dictionary[p1] ?? p1;
    p2 = dictionary[p2] ?? p2;
    return p2 === '' ? `${p1}\n` : `${p1} ${p2}${p3}`;
  };

  /**
   * Render
   */
  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens: any, idx: any, opts: any, env: any, self: any) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info.trim() === _token) {
      return MermaidChart(code.replace(/(.*?)[ \n](.*?)([ \n])/, replacer));
    }

    return defaultRenderer(tokens, idx, opts, env, self);
  };
};

/**
 * Default
 */
MermaidPlugIn.default = {
  startOnLoad: false,
  dictionary: {
    token: 'diagram',
  },
};

export default MermaidPlugIn;
