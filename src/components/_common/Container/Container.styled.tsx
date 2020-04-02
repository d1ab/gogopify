import styled from "styled-components";

export const Divider = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%;
    margin: ${({ theme }) => theme.space.M}px;
`;

export const ColorCircle = styled.div<{ color: string }>`
    height: 20px;
    width: 20px;
    border-radius: 20px;
    background-color: ${({ color }) => color};
`;

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 150px 150px 150px;
    margin: ${({ theme }) => theme.space.M}px;
`;

export const Container = styled.div.attrs<{
    space?: string;
    scroll?: boolean;
}>(({ scroll }) => {
    if (scroll) {
        return {
            style: {
                overflowY: "scroll",
            },
        };
    }
})<{ space?: string; scroll?: boolean }>`
    position: relative;
    background-color: ${({ theme }) => theme.colors.bgBlackLight};
    padding: ${({ theme, space }) => (space ? space : theme.space.L)}px;
`;

export const ContainerFluid = styled.div<{ space?: string }>`
    background-color: ${({ theme }) => theme.colors.bgBlackLight};
    width: 100%;
    height: 100%;
    padding: ${({ theme, space }) => (space ? space : theme.space.L)}px;
`;

export const FlexContainer = styled.div<{ paddings?: number }>`
    padding: ${({ theme, paddings }) =>
        paddings ? paddings : theme.space.NONE}px;
    display: flex;
    position: relative;
`;

/**
 * Flex container item decorator
 */
export const FlexContainerItem = styled.div<{
    space?: string;
    paddings?: number;
}>`
    flex: ${({ space }) => (space ? `0 1 ${space}` : "1")};
    padding: ${({ theme, paddings }) =>
        paddings ? paddings : theme.space.NONE}px;
    height: 100%;
    position: relative;
`;

export const FlexColumnContainer = styled.div<{ alignItems?: string }>`
    display: flex;
    flex-direction: column;
    align-items: ${({ alignItems }) =>
        alignItems ? alignItems : "flex-start"};
`;

export const FlexRowContainer = styled.div<{ alignItems?: string }>`
    display: flex;
    flex-direction: row;
    align-items: ${({ alignItems }) =>
        alignItems ? alignItems : "flex-start"};
`;
