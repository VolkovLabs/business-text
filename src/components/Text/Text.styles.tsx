import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';

export const getStyles = (theme: GrafanaTheme) => ({
  frame: css`
    border-bottom: 1px solid ${theme.colors.panelBorder};
    margin-bottom: 1rem;
    padding: ${theme.spacing.sm};

    &:last-child {
      margin-bottom: 0;
      border-bottom: 0;
    }

    li {
      margin-left: ${theme.spacing.md};
    }

    table {
      border-collapse: collapse;

      th,
      td {
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        border-top: 1px solid ${theme.colors.border2};
        border-left: 1px solid ${theme.colors.border2};
      }

      th {
        font-weight: ${theme.typography.weight.semibold};
        background: ${theme.colors.bg2};
      }

      border-bottom: 1px solid ${theme.colors.border2};
      border-right: 1px solid ${theme.colors.border2};
    }

    blockquote {
      margin: ${theme.spacing.md} 0;
      border-left: 5px solid ${theme.colors.border3};
      padding: ${theme.spacing.sm};
      padding-left: ${theme.spacing.md};

      p {
        font-size: ${theme.typography.size.base};
        color: ${theme.colors.textSemiWeak};
      }
    }
  `,
});
