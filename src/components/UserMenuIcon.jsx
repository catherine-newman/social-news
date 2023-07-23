import styled from "styled-components";
import VisuallyHidden from "./VisuallyHidden";

const StyledUserMenuIcon = styled.button`
  display: flex;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
`;

const UserImage = styled.span`
  background: center / contain no-repeat url(${(props) => props.$img});
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 1em;
`;

const UserMenuIcon = ({ open, setOpen, img }) => {
  return (
    <StyledUserMenuIcon
      open={open}
      onClick={() => setOpen(!open)}
      aria-hidden="true"
    >
      <UserImage $img={img}></UserImage>
      <VisuallyHidden>User Menu Icon</VisuallyHidden>
    </StyledUserMenuIcon>
  );
};

export default UserMenuIcon;
