import styled, { keyframes } from "styled-components";

export const BackdropContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 990;
`;

export const BackdropLoaderWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Loading = keyframes`
  0%{
    transform: translateY(0px);
    background-color: #FFFFFF;
  }
  50%{
    transform: translateY(50px);
    background-color: #1DB954;
  }
  100%{
    transform: translateY(0px);
    background-color: #FFFFFF;
  }
`;

export const Circle = styled.span.attrs<{ time: number }>(({ time }) => {
    return {
        style: {
            animationDelay: `${`0.${time + 1}s`}`,
        },
    };
})<{ time: number }>`
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: #fcdc29;
    border-radius: 50%;
    animation: ${Loading} 1.5s cubic-bezier(0.8, 0.5, 0.2, 1.4) infinite;
    transform-origin: bottom center;
    position: relative;
`;
