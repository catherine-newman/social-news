import StyledMain from "./StyledMain";
import Loading from "./Loading";
import styled from "styled-components";

const StyledLoading = styled(Loading)`
  margin-top: 2em;
`;
const ErrorPage = ({ status }) => {
  return (
    <StyledMain>
      <StyledLoading>
        {status} error.
        <br />
        {status === 404
          ? `Sorry, we couldn't find that page.`
          : "Sorry, something went wrong..."}
      </StyledLoading>
    </StyledMain>
  );
};

export default ErrorPage;
