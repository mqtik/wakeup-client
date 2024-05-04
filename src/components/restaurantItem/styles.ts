import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid #444;
  border-radius: 6px;
  background-color: #111;
  height: 100%;
  position: relative;

  button {
    position: absolute;
    bottom: 5px;
    right: 5px;
    border-radius: 6px;
    margin: 10px;
    // Should use Material Theme instead
    background-color: #ff4103;
  }

  .restaurantInfo {
    display: flex;
    justify-content: flex-start;
  }

  img {
    max-height: 250px;
    max-width: 250px;
    object-fit: cover;
    border-radius: 10px;
  }

  div {
    padding: 20px;
    height: 100%;
  }
  
  h3 {
    margin: 0;
  }
`;

export const modalContentBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%',
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};
