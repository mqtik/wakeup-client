import styled from "styled-components";
import IconButton from "@mui/material/IconButton";

export const Wrapper = styled.div`
  margin: 20px 90px 20px 10px;
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
  padding: 20px;
  background: #ff4103;
  color: #fff;
  border-radius: 5px;
`;
