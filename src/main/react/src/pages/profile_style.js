import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-top: 5%;
  padding-left: 10%;
  padding-right: 10%;
  min-height: 100vh;
`;

export const ProfileLeftRight = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProfileMiniContentContainer = styled.div`
  margin-bottom: 20px;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const EditInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;

  img {
    transition: transform 0.2s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

export const SaveButton = styled(EditButton)``;

export const FriendsSection = styled.div`
  position: sticky;
  top: 90px;
  align-self: start;
  max-height: calc(100vh - 90px);
  overflow-y: auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FriendList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FriendItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const FriendInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const FriendImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const FriendDetails = styled.div`
  display: flex;
  flexdirection: "column";
`;

export const FriendRole = styled.span`
  font-size: 12px;
  color: #888;
`;

export const FriendActionsButton = styled.button`
  padding: 5px 10px;
  margin: 5px;
  fontsize: 14px;
  cursor: pointer;
  backgroundcolor: #4caf50;
  color: white;
  border: none;
  borderradius: 5px;

  &.disabled {
    backgroundcolor: #ccc;
  }

  &:hover {
    backgroundcolor: #218838;
  }
`;

export const MessageButton = styled(FriendActionsButton)`
  background-color: #f0f0f0;
  color: #555;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const ProfileImageContainer = styled.div`
  position: relative;
`;

export const MyPageButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const MyPageButton = styled.button`
  padding: 5px 10px;
  background-color: #f0f0f0;
  color: black;
  border: none;
  borderradius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const DeleteButton = styled.button`
  width: 100%;
  padding: 10px;
  margintop: 20px;
  background-color: #ff4d4d;
  color: white;
  fontsize: 16px;
  border: none;
  borderradius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #cc0000;
  }
`;
