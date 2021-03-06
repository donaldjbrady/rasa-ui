import React, { ReactNode, MouseEvent } from 'react';
import styled, { StyledComponentBase } from 'styled-components';

import timings from '../../enums/timings';
import { Div } from '../../htmlElements';
import { useColors } from '../../context';
import { getShadowStyle } from '../../utils/styles';

export const CardContainer = styled(Div)`
  ${({ elevation }: { elevation: number }) => {
    const { grayXlight, background, shadow } = useColors();
    return `
      display: inline-flex;
      flex-flow: column nowrap;
      font-size: 1rem;
      border-radius: 0.25rem;
      border: ${!elevation ? `1px solid ${grayXlight}` : '0px solid transparent'};
      transition: box-shadow ${timings.slow}, filter ${timings.slow}, border ${timings.slow};
      ${getShadowStyle(elevation, shadow)}
      background-color: ${background};
  `;
  }}
`;

export const Header = styled(Div)`
  ${() => {
    const { grayDark } = useColors();
    return `
      padding: 1.5rem 1.5rem 0rem;
      border-radius: 0.25rem 0.25rem 0rem 0rem;
      font-weight: bold;
      color: ${grayDark};
    `;
  }}
`;

export const NoPaddingHeader = styled(Header)`
  padding: 0;
  overflow: hidden;
`;

export const Body = styled(Div)`
  ${() => {
    const { grayMedium } = useColors();
    return `
      padding: 1.5rem 1.5rem;
      color: ${grayMedium};
    `;
  }}
`;

export const Footer = styled(Div)`
  ${() => {
    const { grayLight } = useColors();
    return `
      padding: 1rem 1.5rem;
      display: flex;
      flex-flow: row wrap;

      justify-content: flex-end;

      color: ${grayLight};

      border-radius: 0rem 0rem 0.25rem 0.25rem;
    `;
  }}
`;

export interface CardProps {
  StyledContainer?: string & StyledComponentBase<any, {}>;
  StyledHeader?: string & StyledComponentBase<any, {}>;
  StyledBody?: string & StyledComponentBase<any, {}>;
  StyledFooter?: string & StyledComponentBase<any, {}>;

  containerProps?: Record<string, unknown>;
  headerProps?: Record<string, unknown>;
  bodyProps?: Record<string, unknown>;
  footerProps?: Record<string, unknown>;

  onClick?: (evt: MouseEvent) => void;

  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;

  elevation?: number;
}

const Card = ({
  StyledContainer = CardContainer,
  StyledHeader = Header,
  StyledBody = Body,
  StyledFooter = Footer,

  containerProps,
  headerProps,
  bodyProps,
  footerProps,

  onClick = () => {},

  header,
  children,
  footer,

  elevation = 1,
}: CardProps): JSX.Element | null => (
  <StyledContainer onClick={onClick} elevation={elevation} {...containerProps}>
    {header && <StyledHeader {...headerProps}>{header}</StyledHeader>}
    {children && <StyledBody {...bodyProps}>{children}</StyledBody>}
    {footer && <StyledFooter {...footerProps}>{footer}</StyledFooter>}
  </StyledContainer>
);

Card.Header = Header;
Card.NoPaddingHeader = NoPaddingHeader;
Card.Footer = Footer;
Card.Body = Body;
Card.Container = CardContainer;

export default Card;
