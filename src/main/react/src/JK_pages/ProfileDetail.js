import React, { useEffect, useState } from "react";
import AxiosApiMembers from "./AxiosApiMembers"; // AxiosApiMembers 임포트
import AxiosApiProfiles from "./AxiosApiProfiles";
import { useParams, useNavigate } from "react-router-dom";
import EducationList from "./EducationList";
import CareerList from "./CareerList";
import SkillList from "./SkillList";
import { FaLink } from "react-icons/fa"; // URL 복사 아이콘 추가

import "./ProfileDetail.css";

const ProfileDetail = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [member, setMember] = useState(null); // 회원 정보 상태 추가
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("education");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfileContent, setEditedProfileContent] = useState("");
  const navigate = useNavigate();

  const fetchProfileDetail = async () => {
    try {
      const data = await AxiosApiProfiles.getProfileById(profileId);
      setProfile(data);
      setEditedProfileContent(data.profileContent);
    } catch (error) {
      console.error("프로필을 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMemberInfo = async () => {
    try {
      const data = await AxiosApiMembers.getMemberById(profileId); // 회원 정보 가져오기
      setMember(data);
    } catch (error) {
      console.error("회원 정보를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchProfileDetail();
    fetchMemberInfo(); // 회원 정보도 함께 가져옴
  }, [profileId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState); // isEditing 상태를 토글
  };

  const handleSave = async () => {
    try {
      await AxiosApiProfiles.updateProfile(profileId, {
        profileContent: editedProfileContent,
      });
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileContent: editedProfileContent,
      }));
      setIsEditing(false); // 저장 후 편집 모드 종료
    } catch (error) {
      console.error("프로필 수정 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // 취소 후 편집 모드 종료
    setEditedProfileContent(profile.profileContent); // 원래 상태로 돌아가기
  };

  const copyProfileUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("프로필 URL이 복사되었습니다!");
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (!profile || !member) {
    return <div className="loading">프로필을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="profile-detail-container">
      <div className="profile-card">
        {/* 프로필 상단 정보 (사진, 이름, 이메일, URL 복사) */}
        <div className="profile-header">
          <div className="profile-left">
            <img
              src={profile.profileImage || "/default-profile.png"} // 기본 프로필 이미지 설정
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="profile-right">
            <div className="profile-info">
              <h2>{member.name || "사용자 이름"}</h2> {/* 이름 렌더링 */}
              <p>{member.email || "이메일 미제공"}</p> {/* 이메일 렌더링 */}
              {/* 팔로워 / 팔로잉 정보 */}
              <div className="follow-info">
                <span>팔로워 {profile.followers || "NN"}</span>
                <span>팔로잉 {profile.following || "NN"}</span>
              </div>
            </div>
            {/* URL 복사 버튼 */}
            <button className="copy-url-btn" onClick={copyProfileUrl}>
              <FaLink />
            </button>
          </div>
        </div>

        {/* 프로필 내용 및 수정 버튼 컨테이너 */}
        <div className="profile-content-container">
          {/* 수정 버튼 */}
          <div className="edit-buttons">
            <button className="edit-btn" onClick={handleEdit}>
              +
            </button>
          </div>

          {/* 프로필 내용 */}
          <div className="profile-content">
            {isEditing ? (
              <textarea
                value={editedProfileContent}
                onChange={(e) => setEditedProfileContent(e.target.value)}
                rows="4"
                style={{ width: "100%" }}
              />
            ) : (
              <p>{profile.profileContent}</p> // 기본 출력
            )}
          </div>

          {/* 편집 모드일 때만 저장/취소 버튼 표시 */}
          {isEditing && (
            <div className="edit-buttons">
              <button className="save-btn" onClick={handleSave}>
                저장
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                취소
              </button>
            </div>
          )}
        </div>

        {/* Skill List */}
        <div className="skill-container">
          <SkillList profileId={profileId} />
        </div>

        {/* 탭 메뉴 */}
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === "education" ? "active" : ""}`}
            onClick={() => handleTabChange("education")}
          >
            학력
          </button>
          <button
            className={`tab ${activeTab === "career" ? "active" : ""}`}
            onClick={() => handleTabChange("career")}
          >
            경력
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="tabs-content">
          {activeTab === "education" && <EducationList profileId={profileId} />}
          {activeTab === "career" && <CareerList profileId={profileId} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
