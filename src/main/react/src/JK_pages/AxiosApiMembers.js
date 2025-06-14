import axios from "axios";

const MEMBER_API_URL = "http://localhost:8111/api/members";

const AxiosApiMembers = {
  // 특정 회원 정보 조회 (이름, 이메일 등)
  getMemberById: async (memberId) => {
    try {
      const response = await axios.get(`${MEMBER_API_URL}/${memberId}`);
      return response.data; // 회원 정보 반환
    } catch (error) {
      console.error("Error fetching member by ID", error);
      throw error;
    }
  },
};
export default AxiosApiMembers;
