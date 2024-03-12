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
    infoContainer: css`
      margin-bottom: ${theme.spacing(1)};
      background: ${theme.colors.info.transparent};
      padding: ${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(0.5)} ${theme.spacing(1)};
      border-left: 5px solid ${theme.colors.info.border};
      border-radius: 10px;
      width: 100%;
      max-width: 600px;
    `,
    infoTitleContainer: css`
      display: flex;
      align-items: center;
    `,
    infoTitle: css`
      margin: 0 0 0 ${theme.spacing(1)};
      font-size: ${theme.typography.h5.fontSize};
      font-weight: 500;
      line-height: ${theme.typography.h5.lineHeight};
    `,
    infoMessage: css`
      padding: ${theme.spacing(1)} 0 ${theme.spacing(1)} ${theme.spacing(0.5)};
      font-size: ${theme.typography.bodySmall.fontSize};
      font-weight: ${theme.typography.bodySmall.fontWeight};
      line-height: ${theme.typography.bodySmall.lineHeight};
    `,
  };
};
