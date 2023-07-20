import styled from "styled-components";

const Loading = styled.p`
  text-align: center;
  font-size: 1.2em;
  background-color: ${({ theme }) => theme.cardbackground};
  border-radius: 1em;
  padding: 1em;
  margin-bottom: 2em;
`;

export default Loading;
