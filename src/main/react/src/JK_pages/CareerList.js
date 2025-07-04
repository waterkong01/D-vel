import React, { useState, useEffect } from "react";
import AxiosApiCareers from "./AxiosApiCareers";
import "./CareerList.css";

const CareerList = ({ profileId }) => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCareer, setNewCareer] = useState({
    companyName: "",
    jobName: "",
    startDate: "",
    endDate: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false); // 경력 추가 폼 보이기/숨기기 상태

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await AxiosApiCareers.getCareerByProfileId(profileId);
        setCareers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchCareers();
    }
  }, [profileId]);

  const handleAddCareer = async () => {
    try {
      const newCareerData = await AxiosApiCareers.createCareer(
        profileId,
        newCareer
      );
      setCareers([...careers, newCareerData]);
      setNewCareer({
        companyName: "",
        jobName: "",
        startDate: "",
        endDate: "",
      }); // 초기화
      setIsFormVisible(false); // 폼 숨기기
    } catch (error) {
      console.error("경력 추가 오류", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCareer((prevCareer) => ({
      ...prevCareer,
      [name]: value,
    }));
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error fetching careers</div>;

  return (
    <div className="career-list">
      {/* 경력 섹션 헤더 */}
      <div className="career-list-header">
        <h3 className="career-title">CAREER</h3>
        <button
          className="add-career-btn"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          <span className="add-career-icon">+</span>
        </button>
      </div>

      {/* 경력 추가 폼 */}
      {isFormVisible && (
        <div className="add-career-form">
          <h4>경력 추가</h4>
          <input
            type="text"
            name="companyName"
            value={newCareer.companyName}
            onChange={handleInputChange}
            placeholder="회사명"
          />
          <input
            type="text"
            name="jobName"
            value={newCareer.jobName}
            onChange={handleInputChange}
            placeholder="직무명"
          />
          <input
            type="date"
            name="startDate"
            value={newCareer.startDate}
            onChange={handleInputChange}
            placeholder="시작일"
          />
          <input
            type="date"
            name="endDate"
            value={newCareer.endDate}
            onChange={handleInputChange}
            placeholder="종료일"
          />
          <button onClick={handleAddCareer}>경력 추가</button>
        </div>
      )}

      {/* 경력 목록 */}
      {careers.length === 0
        ? ""
        : careers.map((career) => (
            <div key={career.id} className="career-item">
              <div className="career-header">
                <h3>{career.companyName}</h3>
                <p>{career.jobName}</p>
              </div>
              <div className="career-dates">
                <span className="start-date">
                  {career.startDate} - {career.endDate}
                </span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default CareerList;
