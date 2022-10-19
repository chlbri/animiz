/** @jsxImportSource solid-js */

import type { Component, JSX } from 'solid-js';
import { useTooltip } from '~hooks/useTooltip';
import { Tooltip, TootltipProps } from '../atoms/Tooltip';

type Props = {
  children: JSX.Element;
  title?: string;
  summary: string;
};

export const WithTooltip: Component<Props> = ({
  children,
  title,
  summary,
}) => {
  // #region Preparation
  let ref: any = null;

  const { mouseEvents, tooltipProps: props } = useTooltip(() => ref, {
    timeToShow: 600,
  });

  const tooltipProps: TootltipProps = {
    title,
    summary,
    ...props,
  };
  // #endregion

  return (
    <div
      ref={ref}
      class='relative w-max flex cursor-pointer hover:cursor-help transition duration-500'
      {...mouseEvents}
    >
      {children}
      <Tooltip {...tooltipProps} />
    </div>
  );
};
