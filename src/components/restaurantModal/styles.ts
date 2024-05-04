import styled from "styled-components";

export const Wrapper = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .title {
    padding: 10px;
    font-weight: 700;
    font-size: 1.2rem;
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  img {
    height: 100px;
  }
`;

export const modalContentBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "#333",
  border: "2px solid #000",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  padding: 0,
  overflow: "hidden",
};
