import React, { useState, useEffect } from "react";
import "../../design/Mypage/EducationList.css";
import EducationApi from "../../api/EducationApi";
import {
  EduContainer,
  EduDate,
  EduHeader,
  EduInfo,
  EduItem,
} from "../../design/Mypage/EducationListDesign";
import { ChattingIcon } from "../../design/Msg/MsgPageDesign";
import Common from "../../utils/Common";
import {FeedBottom} from "../../design/Mypage/FeedListDesign";
import {toast} from "react-toastify";

const EducationList = ({ mypageId }) => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [newEducation, setNewEducation] = useState({
    schoolName: "",
    degree: "",
    startDate: "",
    endDate: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false); // 교육 추가 폼 보이기/숨기기 상태

  // 수정 모드 상태
  const [editingEduId, setEditingEduId] = useState(null);
  const [editingEduDegree, setEditingEduDegree] = useState("");
  const [editingEduSchoolName, setEditingEduSchoolName] = useState("");
  const [editingEduStartDate, setEditingEduStartDate] = useState("");
  const [editingEduEndDate, setEditingEduEndDate] = useState("");

  const EDU_ICON_URL = [
    "https://firebasestorage.googleapis.com/v0/b/d-vel-b334f.firebasestorage.app/o/firebase%2Fprofile%2Ftrash%201.png?alt=media&", // trash
    // "https://firebasestorage.googleapis.com/v0/b/d-vel-b334f.firebasestorage.app/o/firebase%2Fprofile%2Fclose%201.png?alt=media&",  // close
    "https://firebasestorage.googleapis.com/v0/b/d-vel-b334f.firebasestorage.app/o/firebase%2Fprofile%2Fplus1_before%201.png?alt=media&", // add
    "https://firebasestorage.googleapis.com/v0/b/d-vel-b334f.firebasestorage.app/o/firebase%2Fprofile%2Fedit-text%201.png?alt=media&", // edit
  ];

  useEffect(() => {
    // 현재 로그인한 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        const response = await Common.getTokenByMemberId();
        const memberId = response.data;
        setLoggedInUser(memberId);
        console.log("로그인한 memberId:", typeof memberId);
      } catch (e) {
        console.error("로그인한 사용자 정보를 가져오는 중 오류 발생:", e);
      }
    };

    const fetchEducation = async () => {
      try {
        const data = await EducationApi.getEducationByMypageId(mypageId);
        setEducation(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
    if (mypageId) {
      fetchEducation();
    }
  }, [mypageId]);

  console.log("education 데이터 확인", education);

  const handleAddEducation = async () => {
    try {
      const newEducationData = await EducationApi.createEducation(
        mypageId,
        newEducation
      );
      setEducation([...education, newEducationData]);
      setNewEducation({
        schoolName: "",
        degree: "",
        startDate: "",
        endDate: "",
      }); // 초기화
      setIsFormVisible(false); // 폼 숨기기
    } catch (error) {
      console.error("교육 추가 오류", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="edu-error">Error fetching education</div>;

  const isOwner = loggedInUser === Number(mypageId);

  // 수정 모드 활성화
  const startEditingEdu = (edu) => {
    console.log("mypageId:", mypageId);
    if (edu.mypageId !== mypageId) {
      toast.error("자신의 게시글만 수정할 수 있습니다.");
      return;
    }
    setIsFormVisible(true);
    setEditingEduId(edu.educationId);
    setEditingEduDegree(edu.degree);
    setEditingEduSchoolName(edu.schoolName);
    setEditingEduStartDate(edu.startDate);
    setEditingEduEndDate(edu.endDate);
  };

  // 수정 취소
  const cancelEditingEdu = () => {
    setEditingEduId(null);
    setEditingEduDegree("");
    setEditingEduSchoolName("");
    setEditingEduStartDate("");
    setEditingEduEndDate("");
    setIsFormVisible(false);
  };

  // 학력 수정 저장
  const submitEduEdit = async () => {
    if (!editingEduDegree.trim()) return;
    if (!editingEduSchoolName.trim()) return;
    if (!editingEduStartDate.trim()) return;
    if (!editingEduEndDate.trim()) return;
    try {
      await EducationApi.updateEducation(editingEduId, {
        mypageId,
        degree: editingEduDegree,
        schoolName: editingEduSchoolName,
        startDate: editingEduStartDate,
        endDate: editingEduEndDate,
      });

      // 수정된 내용을 반영하여 education 업데이트
      setEducation((prevEdu) =>
          prevEdu.map((edu) =>
              edu.educationId === editingEduId
                  ? {
                    ...edu,
                    degree: editingEduDegree,
                    schoolName: editingEduSchoolName,
                    startDate: editingEduStartDate,
                    endDate: editingEduEndDate,
                  }
                  : edu
          )
      );

      setEditingEduId(null);
      setEditingEduDegree("");
      setEditingEduSchoolName("");
      setEditingEduStartDate("");
      setEditingEduEndDate("");
      toast.success("학력이 수정되었습니다.");
    } catch (error) {
      console.error("❌ 학력 수정 실패:", error);
      toast.error("학력 수정에 실패했습니다.");
    }
    setIsFormVisible(false);
  };

  // 학력 삭제
  const deleteEdu = async (educationId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await EducationApi.deleteEducation(mypageId, educationId);
      setEducation((prevEdu) => prevEdu.filter((edu) => edu.educationId !== educationId));
      toast.success("학력이 삭제되었습니다.");
    } catch (error) {
      console.error("❌ 학력 삭제 실패:", error);
      toast.error("학력 삭제에 실패했습니다.");
    }
  }

  return (
    <>
      <EduHeader>
        <h3>EDUCATION</h3>
        {isOwner && (
            <ChattingIcon
                src={EDU_ICON_URL[1]}
                onClick={() => setIsFormVisible(!isFormVisible)}
            />
        )}
      </EduHeader>

      {/*{isFormVisible && (
          <div className="add-education-form">
            <h4>교육 추가</h4>
            <input
                type="text"
                name="schoolName"
                value={newEducation.schoolName}
                onChange={handleInputChange}
                placeholder="학교명"
            />
            <input
                type="text"
                name="degree"
                value={newEducation.degree}
                onChange={handleInputChange}
                placeholder="학위명"
            />
            <input
                type="date"
                name="startDate"
                value={newEducation.startDate}
                onChange={handleInputChange}
                placeholder="시작일"
            />
            <input
                type="date"
                name="endDate"
                value={newEducation.endDate}
                onChange={handleInputChange}
                placeholder="종료일"
            />
            <button onClick={handleAddEducation}>교육 추가</button>
          </div>
      )}*/}

      {(isFormVisible || editingEduId !== null) && (
          <div className="add-education-form">
            <h4>{editingEduId !== null ? "교육 수정" : "교육 추가"}</h4>
            <input
                type="text"
                name="schoolName"
                value={editingEduId !== null ? editingEduSchoolName : newEducation.schoolName}
                onChange={(e) =>
                    editingEduId !== null
                        ? setEditingEduSchoolName(e.target.value)
                        : setNewEducation((prev) => ({ ...prev, schoolName: e.target.value }))
                }
                placeholder="학교명"
            />
            <input
                type="text"
                name="degree"
                value={editingEduId !== null ? editingEduDegree : newEducation.degree}
                onChange={(e) =>
                    editingEduId !== null
                        ? setEditingEduDegree(e.target.value)
                        : setNewEducation((prev) => ({ ...prev, degree: e.target.value }))
                }
                placeholder="학위명"
            />
            <input
                type="date"
                name="startDate"
                value={editingEduId !== null ? editingEduStartDate : newEducation.startDate}
                onChange={(e) =>
                    editingEduId !== null
                        ? setEditingEduStartDate(e.target.value)
                        : setNewEducation((prev) => ({ ...prev, startDate: e.target.value }))
                }
                placeholder="시작일"
            />
            <input
                type="date"
                name="endDate"
                value={editingEduId !== null ? editingEduEndDate : newEducation.endDate}
                onChange={(e) =>
                    editingEduId !== null
                        ? setEditingEduEndDate(e.target.value)
                        : setNewEducation((prev) => ({ ...prev, endDate: e.target.value }))
                }
                placeholder="종료일"
            />

            {editingEduId !== null ? (
                <div className="form-buttons">
                  <button onClick={submitEduEdit}>저장</button>
                  <button onClick={cancelEditingEdu}>취소</button>
                </div>
            ) : (
                <button onClick={handleAddEducation}>교육 추가</button>
            )}
          </div>
      )}

      {education.length > 0 ? (
          education.map((edu) => (
              <EduContainer key={edu.educationId}>
                <EduItem>
                  <EduInfo>
                    <span>{edu.schoolName}</span>
                    <span>-</span>
                    <span>{edu.degree}</span>
                  </EduInfo>
                  <EduDate>
                    <span>
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </EduDate>
                </EduItem>
                <FeedBottom>
                  {editingEduId === edu.educationId ? (
                      <>
                        <button className="save" onClick={submitEduEdit}>저장</button>
                        <button onClick={cancelEditingEdu}>취소</button>
                      </>
                  ) : (
                      <>
                        {isOwner && ( // 로그인한 사용자가 이 페이지의 주인이라면
                            <>
                              <ChattingIcon
                                  src={EDU_ICON_URL[2]}
                                  alt="edit"
                                  onClick={() => startEditingEdu(edu)}
                              />
                              <ChattingIcon
                                  src={EDU_ICON_URL[0]}
                                  alt="delete"
                                  onClick={() => deleteEdu(edu.educationId)}
                              />
                            </>
                        )}
                      </>
                  )}
                </FeedBottom>
              </EduContainer>
          ))
      ) : (
          <div>해당 사용자의 학력이 없습니다.</div>
      )}
    </>
  );
};

export default EducationList;
