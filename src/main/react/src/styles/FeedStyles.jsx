import styled from "styled-components";

/**
 * 🔹 전체 레이아웃 컨테이너
 */
export const LayoutContainer = styled.div`
  //margin-top: 70px;
  display: grid;
  grid-template-columns: 1fr; /* 단일 컬럼 레이아웃 */
  place-items: center; /* 자식 요소를 중앙 정렬 */
  gap: 20px;
  //padding: 20px;
  //min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: transparent;

  /* 작은 화면에서도 단일 컬럼 유지 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/**
 * 🔹 공통 섹션 스타일 (sticky)
 */
export const Section = styled.div`
  position: sticky;
  top: 90px;
  align-self: start;
  max-height: calc(100vh - 90px);
  overflow-y: auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: transparent;

  /* Slightly reduce padding and font sizes on tablets */
  @media (max-width: 1200px) and (min-width: 769px) {
    padding: 15px;
    font-size: 0.95rem; /* slightly smaller text */
  }
`;

/** 🔹 프로필 섹션 */
export const ProfileSection = styled(Section)`
  background-color: transparent;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

/** 🔹 프로필 이미지 */
export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 15px;
  background-color: transparent;

  /* Slightly shrink on tablet */
  @media (max-width: 1200px) and (min-width: 769px) {
    width: 120px;
    height: 120px;
  }
`;

/** 🔹 피드 컨테이너 */
export const FeedContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 10px 10px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto; /* 상하 20px 여백과 수평 중앙 정렬 */
  width: 90%; /* 화면 너비의 90% 사용 */
  min-width: 700px;
  max-width: 800px; /* 최대 너비 설정 */

  /* On tablets, shrink padding a bit */
  @media (max-width: 1200px) and (min-width: 769px) {
    padding: 15px;
  }
`;

/** 🔹 피드 작성 컨테이너 */
export const CreateFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    margin-bottom: 10px;
    box-sizing: border-box;
    background-color: #fff;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #000; /* 검정 배경 */
    color: #fff; /* 흰색 글씨 */
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #333; /* hover 시 약간 밝은 회색 */
    }
  }
`;

/** 🔹 텍스트 영역 컨테이너 (이미지 업로드 버튼 포함) */
export const TextareaContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
`;

/** 🔹 이미지 업로드 버튼 레이블 */
export const UploadIconLabel = styled.label`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background-color: transparent;
`;

/** 🔹 이미지 업로드 아이콘 */
export const UploadIcon = styled.img`
  width: 30px;
  height: 30px;
  transition: transform 0.2s ease;
  background-color: transparent;

  &:hover {
    transform: scale(1.1);
  }
`;

/** 🔹 게시글 목록 컨테이너 */
export const PostList = styled.div`
  margin-top: 20px;
  min-width: 70%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: transparent;
`;

/** 🔹 개별 게시글 스타일 */
export const Post = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: transparent;
`;

/** 🔹 게시글 헤더 (작성자 정보 포함) */
export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: #fff;
`;

/** 🔹 작성자 이미지 */
export const AuthorImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: transparent;
`;

/** 🔹 작성자 세부 정보 */
export const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
    & button {
        background: #DBDBDB;
        border: none;
        padding: 0.8em 1em;
        border-radius: 10px;
    }
`;

/** 🔹 작성자 이름 */
export const AuthorName = styled.span`
  font-weight: bold;
  background-color: transparent;
`;

/** 🔹 작성자 역할 또는 회사 */
export const AuthorRole = styled.span`
  color: #888;
  background-color: transparent;
`;

/** 🔹 게시글 날짜 */
export const PostDate = styled.span`
  font-size: 12px;
  color: #888;
  background-color: transparent;
`;

/** 🔹 업로드된 이미지 스타일 */
export const UploadedImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 300px;
  width: auto;
  height: auto;
  margin-top: 10px;
  border-radius: 8px;
  background-color: transparent;
`;

/** 🔹 새로고침 버튼 스타일 */
export const RefreshButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 50px;
  height: 50px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

/** 🔹 새로고침 아이콘 스타일 */
export const RefreshIcon = styled.img`
  width: 30px;
  height: 30px;
  transition: transform 0.2s ease;
  background-color: transparent;

  &.refreshing {
    transform: rotate(360deg);
  }
`;

/** 🔹 친구 추천 섹션 */
export const FriendsSection = styled(Section)`
  background-color: transparent;
  @media (max-width: 768px) {
    display: none;
  }

  /* Slightly reduce padding or font size on tablets if you want */
  @media (max-width: 1200px) and (min-width: 769px) {
    padding: 15px;
    font-size: 0.95rem;
  }
`;

/** 🔹 친구 목록 스타일 */
export const FriendList = styled.ul`
  list-style: none;
  padding: 0;
  background-color: transparent;
`;

/** 🔹 개별 친구 항목 스타일 */
export const FriendItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: transparent;
`;

/** 🔹 친구 정보 영역 */
export const FriendInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
`;

/** 🔹 친구 이미지 */
export const FriendImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: transparent;
`;

/** 🔹 친구 상세 정보 */
export const FriendDetails = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

/** 🔹 친구 역할 또는 회사 */
export const FriendRole = styled.span`
  font-size: 12px;
  color: #888;
  background-color: transparent;
`;

/** 🔹 친구 액션 버튼 영역 */
export const FriendActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  background-color: transparent;
`;

/** 🔹 친구 요청 버튼 */
export const FriendRequestButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    background-color: #45a049;
  }

  /* Tablet (769–1200px): Slightly reduce size */
  @media (max-width: 1200px) and (min-width: 769px) {
    padding: 4px 8px;
    font-size: 13px;
  }

  /* Mobile (<768px): Even smaller */
  @media (max-width: 768px) {
    padding: 3px 6px;
    font-size: 12px;
  }
`;

/** 🔹 메시지 보내기 버튼 */
export const MessageButton = styled.button`
  background-color: #f0f0f0;
  color: #555;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  /* Tablet (769–1200px) */
  @media (max-width: 1200px) and (min-width: 769px) {
    padding: 4px 8px;
    font-size: 13px;
  }

  /* Mobile (<768px) */
  @media (max-width: 768px) {
    padding: 3px 6px;
    font-size: 12px;
  }
`;

/* ===== 추가된 새로운 스타일 ===== */

/** 🔹 피드 액션 버튼 컨테이너 (Like, Comment, Repost 등) */
export const PostActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  background-color: #fff;
`;

/** 🔹 액션 버튼 (Like, Comment, Repost) */
export const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #000;
  }
`;

/** 🔹 편집 버튼 (저장, 취소 등 편집 관련 액션) */
export const EditButton = styled(ActionButton)`
  padding: 5px;
  font-size: 12px;
  background-color: transparent;
`;

/** 🔹 댓글 입력 영역 */
export const CommentContainer = styled.div`
  margin-top: 10px;
  background-color: #fff;
`;

/** 🔹 리포스트 입력 영역 */
export const RepostContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #fff;
`;

/** 🔹 리포스트 입력 필드 */
export const RepostInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
`;

/** 🔹 리포스트 제출 버튼 */
export const RepostSubmitButton = styled.button`
  width: 120px;
  padding: 8px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005582;
  }
`;

/** 🔹 원본 게시글 컨테이너 (리포스트된 경우) - LinkedIn 스타일 미니 피드 */
export const OriginalPostContainer = styled.div`
  border: 1px solid #d1d9e6; /* subtle border */
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
`;

/** 🔹 원본 게시글 헤더 */
export const OriginalPostHeader = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #0073b1;
  margin-bottom: 5px;
  background-color: #fff;
`;

/** 🔹 원본 게시글 내용 */
export const OriginalPostContent = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  background-color: transparent;
`;

/** 🔹 댓글 입력 컨테이너 - 입력 필드와 제출 버튼 포함 */
export const CommentInputContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
`;

/** 🔹 댓글 입력 필드 */
export const CommentInput = styled.input`
  width: 100%;
  padding: 8px 40px 8px 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

/** 🔹 댓글 제출 아이콘 (입력 필드 내부 오른쪽 배치) */
export const CommentSubmitIcon = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  color: #0073b1;
  padding: 0;
`;

/** 🔹 리플라이(답글) 컨테이너 - 부모 댓글 내부에 답글들을 계층적으로 렌더링 */
export const ReplyContainer = styled.div`
  margin-left: 20px;
  border-left: 2px solid #eee;
  padding-left: 10px;
  margin-top: 10px;
  background-color: #fff;
`;

/** 🔹 댓글 카드 - 댓글을 감싸는 컨테이너 (반복적으로 사용) */
export const CommentCard = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #fff;
`;
