import { getUsers } from "../api";
import { useState, useEffect } from "react";
import styled from "styled-components";
import StyledMain from "./StyledMain";

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

const UserLogin = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getUsers();
      setUsers(res);
    })();
  });

  return (
    <StyledMain>
      <Container>
        <StyledUL>
          {users.map((user) => {
            return <li key={user.username}>{user.username}</li>;
          })}
        </StyledUL>
      </Container>
    </StyledMain>
  );
};

export default UserLogin;
