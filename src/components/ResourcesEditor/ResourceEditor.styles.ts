import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

/**
 * Styles
 */
export const getStyles = (theme: GrafanaTheme2) => {
  return {
    newGroup: css`
      margin: ${theme.spacing(2)} 0;
    `,
    group: css`
      margin-bottom: ${theme.spacing(1)};
    `,
    groupHeader: css`
      overflow: hidden;
      text-overflow: ellipsis;
    `,
    dragHandle: css`
      display: flex;
      margin: ${theme.spacing(0, 0.5)};
    `,
    dragIcon: css`
      cursor: grab;
      color: ${theme.colors.text.disabled};
      &:hover {
        color: ${theme.colors.text};
      }
    `,
    removeButton: css`
      color: ${theme.colors.text.secondary};
    `,
    link: css`
      text-decoration: underline;
    `,
  };
};
