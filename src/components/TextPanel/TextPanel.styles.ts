import { css } from '@emotion/css';
import { GrafanaTheme2 } from '@grafana/data';

/**
 * Styles
 */
export const Styles = (theme: GrafanaTheme2) => {
  return {
    root: css`
      display: flex;
      flex-direction: column;
    `,
    frameSelect: css`
      padding: ${theme.spacing(1)};
    `,
  };
};
