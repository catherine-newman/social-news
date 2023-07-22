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

  //   &:focus {
  //     outline: none;
  //   }

  //   div {
  //     width: 2rem;
  //     height: 0.25rem;
  //     background: ${({ theme }) => theme.cardborder};
  //     border-radius: 10px;
  //     transition: all 0.1s linear;
  //     position: relative;
  //   }
`;

const UserImage = styled.span`
  background-image: url(${(props) => props.$img});
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`;

const UserMenuIcon = ({ open, setOpen, img }) => {
  console.log(img);
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
