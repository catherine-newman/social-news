import { getUsers } from "../api";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import StyledMain from "./StyledMain";
import { UserContext } from "../contexts/User";
import Button from "./Button";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  width: 640px;
  padding: 2em;
  background-color: #ffffff;
  margin-top: 2em;
  border-radius: 1em;
  margin-bottom: 2em;

  @media screen and (max-width: 640px) {
    width: 95%;
  }
`;

const StyledUL = styled.ul`
  list-style-type: none;
  text-align: center;

  li {
    padding: 1em;
  }
`;

const StyledButton = styled(Button)`
  &:disabled {
    cursor: not-allowed;
    background-color: #cacdf7;
  }
`;

const UserLogin = () => {
  const [users, setUsers] = useState([]);
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      const res = await getUsers();
      setUsers(res);
    })();
  }, []);

  const handleClick = (event) => {
    const newUserName = event.target.innerText;
    const newUser = users.filter((user) => user.username === newUserName)[0];
    setUser(newUser);
  };

  return (
    <StyledMain>
      <Container>
        <StyledUL>
          {users.map((user_option) => {
            return (
              <li key={user_option.username}>
                <StyledButton
                  onClick={handleClick}
                  disabled={user.username === user_option.username}
                >
                  {user_option.username}
                </StyledButton>
              </li>
            );
          })}
        </StyledUL>
      </Container>
    </StyledMain>
  );
};

export default UserLogin;
