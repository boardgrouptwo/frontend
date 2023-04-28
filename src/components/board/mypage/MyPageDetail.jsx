import React, { useState } from 'react'
import { Button, Col, Collapse, Fade, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { userInfoDB, userUpdateDB } from '../../../service/MemberDBLogic';
import MainHeader from '../../include/MainHeader';
import MyPageBar from './MyPageBar';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const MyPageDetail = () => {
  const navigate = useNavigate();
  const userid = useSelector(state => state.userid);     // 사용자 아이디
  const token = useSelector(state => state.token); 

  // 사용자 정보 객체
  const [ userInfo, setUserInfo ] = useState({});

  // 초기값 설정
  const [user_pw, setUserPw]= useState('');              // 비밀번호
  const [user_name, setUserName]= useState('');          // 이름 
  const [user_birth, setUserBday]= useState('');         // 생일
  const [user_gender, setUserGender]= useState('');      // 성별
  const [user_tel, setUserTel]= useState('');            //전화번호
  const [user_email, setUserEmail]= useState('');        //이메일

  const [showError, setShowError] = useState(false);    //폼 검증 유효성 검사
  const [showError2, setShowError2] = useState(false);  //폼 검증 유효성 검사
  const [validated, setValidated] = useState(false);    //폼 검증 유효성 검사

  /* 회원가입을 하기 위해서는 아이디 중복검사를 해야함 */
  const[check, setCheck] = useState(false);

  /* 아이디 중복 검사 결과내용 */
  const [open, setOpen] = useState(false);


  // 폼 제출 이벤트 처리
  const handleSubmit = async(event) => {   // form 컴포넌트에서 submit 할 때 실행됨
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) { //유효 확인 실패 했을 경우
      event.preventDefault();  //이벤트 중단
      event.stopPropagation(); //이벤트 중단
    }
    setValidated(true);  // validated 변수를 true로 설정
    
    event.preventDefault();

    //화면에 입력된 값을 DB로 보내는
    const member= {
      user_id: userid,
      user_pw: user_pw,
      user_name: user_name,
      user_birth: user_birth,
      user_gender: user_gender,
      user_tel: user_tel,
      user_email: user_email,
    }
    console.log(member);

    const res = await userUpdateDB(member, token);
    console.log(res.data)

    if (res.data != 1){
      console.log("폼작성에 실패하였습니다")
    }else{
      console.log("폼작성 성공")
      //폼작성 성공시 작성성공 화면으로 이동

      Swal.fire({
        icon: "success",
        title: "수정하였습니다",
        showCancelButton: false,
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "my-confirm-button"
        }
      })

      navigate("/mypage");
    }
  };  // end of handleSubmit


  //아이디 유효성 검사
  const idCheck = () =>{
    console.log("아이디 중복검사 버튼 클릭")
      setOpen(!open)
      setCheck(!check)
  }



  //되돌아가기 버튼
  const updateBack = () =>{
    navigate('/mypage')
  }


  useEffect(() => {
    // 사용자 정보 가져오기
    const FindUserInfo = async () => {
      console.log("FindUserInfo 호출")

      const user = {
        user_id: userid,
      }

      const res = await userInfoDB(user, token);
      console.log(res.data);

      const obj = {
        user_id: res.data.user_id,
        user_name: res.data.user_name,
        user_birth: res.data.user_birth,
        user_gender: res.data.user_gender,
        user_tel: res.data.user_tel,
        user_email: res.data.user_email,
        user_enter: res.data.user_enter,
        user_type: res.data.user_type,
        user_profile_url: res.data.user_profile_url,
        user_memo: res.data.user_memo,
      }

      setUserInfo(obj)
      setUserGender(obj.user_gender);
    }

    FindUserInfo();
    console.log(userInfo);
  }, [])


  return (
    <>
      <MainHeader/>
      <MyPageBar />
        <div className='sponContainer' style={{position: "relative"}} >
          <Form className='sponsor-form' noValidate validated={validated} onSubmit={handleSubmit} > 
            <h3 className='sponsor-form-text'> 회원수정 </h3>
            <br />
            <br />
            {/* ********  아이디  ********* */}
            <Form.Group as={Row} className="mb-3" controlId="userId" style={{textAlign: "center"}}> 
              <Form.Label column sm={2}>아이디</Form.Label>
              <Col sm={8} style={{ display: "flex", alignItems: "center" }}>
                <Form.Control 
                  type="text"
                  defaultValue={userInfo.user_id}
                  disabled={true}
                />
              </Col>
            </Form.Group>

            {/* ********  비밀번호  ********* */}
            <Form.Group as={Row} className="mb-3" controlId="userPw" style={{textAlign: "center"}} > 
              <Form.Label column sm={2}>비밀번호</Form.Label>
              <Col sm={8}>
                <Form.Control 
                  type="text"
                  onChange={(e) => setUserPw(e.target.value)}
                />
                <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                  특수문자 포함 6~8글자로 작성해주세요.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* ********  이름  ********* */}
            {/* //controlId로 label과 input 요소를 연결, Form.Control.Feedback을 사용하여 폼 유효성 검사 메시지를 표시 */}
            <Form.Group as={Row} className="mb-3" controlId="userName" style={{textAlign: "center"}} >  
                <Form.Label column sm={2}>이름</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    defaultValue={userInfo.user_name}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                    한글만 입력해주세요.
                  </Form.Control.Feedback>
                </Col>
            </Form.Group>

            {/* ********  생년월일  ********* */}
            <Form.Group as={Row} className="mb-3" controlId="userBday" style={{textAlign: "center"}} >
              <Form.Label column sm={2}>
                생년월일
              </Form.Label>
              <Col sm={8}>
              <Form.Control 
                type="date" 
                placeholder="생년월일을 입력해주세요." 
                required
                value={userInfo.user_birth}
                onChange={(e) => setUserBday(e.target.value)}
              />
              </Col>
            </Form.Group>

            {/* ********  성별  ********* */}
            <fieldset>
              <Form.Group as={Row} className="mb-3" controlId="userRadios" style={{textAlign: "center"}} >
              <Form.Label as="legend" column sm={2}>
                성별
              </Form.Label>
              <Col sm={8} style={{textAlign: "left"}} >
                <Form.Check
                  type="radio"
                  label="남성"
                  name="userRadios" //같은 그룹으로 묶여 있눈 라디오 그룹은 모두 같은 name 속성 값
                  id="userRadios1"   // label과 연결하는데 사용
                  value="남성"
                  onChange={(e) => {
                    setUserGender(e.target.value);
                  }}
                  required
                  checked={ userInfo.user_gender == "남성" ? true : false }
                />
                <Form.Check
                  type="radio"
                  label="여성"
                  name="userRadios"
                  id="userRadios2"
                  value="여성"
                  onChange={(e) => {
                    setUserGender(e.target.value);
                  }}
                  checked={ user_gender == "여성" ? true : false }
                />
              </Col>
              </Form.Group>
            </fieldset>

            {/* ********  연락처  ********* */}
            <Form.Group as={Row} className="mb-3" controlId="sponsorNumber" style={{textAlign: "center"}} >
              <Form.Label column sm={2}>연락처</Form.Label>
              <Col sm={8}>
                <Form.Control 
                  type="tel" 
                  placeholder="- 를 제외하고 작성해주세요" 
                  pattern="[0-9]*"
                  required
                  defaultValue={userInfo.user_tel}
                  onFocus={() => setShowError2(true)}
                  onBlur={() => setShowError2(false)}
                  onChange={(e) => setUserTel(e.target.value)}
                />
                <Form.Control.Feedback type="invalid" style={{ display: showError2 ? "block" : "none" }}>
                숫자만 입력해주세요.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* ********  이메일  ********* */}
            {/* //controlId로 label과 input 요소를 연결, Form.Control.Feedback을 사용하여 폼 유효성 검사 메시지를 표시 */}
            <Form.Group as={Row} className="mb-3" controlId="userName" style={{textAlign: "center"}} >  
              <Form.Label column sm={2}>이메일</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  defaultValue={userInfo.user_email}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
                  양식에 맞게 입력해주세요.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* ********  입원여부  ********* */}
            {/* <fieldset>
              <Form.Group as={Row} className="mb-3" style={{textAlign: "center"}} >
                <Form.Label as="legend" column sm={2}>입원여부</Form.Label>
                <Col sm={8} style={{textAlign: "left"}} >
                  <Form.Check
                    type="radio"
                    label="입원"
                    name="userEnter"
                    id="userEnter1"
                    value="입원"
                    checked={userEnter === '입원'} // 현재 선택된 값과 비교하여 체크 여부 결정
                    onChange={(e) => setUserEnter(e.target.value)} // 상태 업데이트 함수
                    required
                  />
                  <Form.Check
                    type="radio"
                    label="비입원"
                    name="userEnter"
                    id="userEnter2"
                    value="비입원"
                    checked={user_enter === '비입원'}
                    onChange={(e) => setUserEnter(e.target.value)}
                  />
                </Col>
              </Form.Group>
            </fieldset> */}
            <br />
            <br />
            <br />

            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 3 }} >
                  <Button type="submit" variant="success" >작성완료</Button>{' '}
                  <Button variant="secondary" onClick={updateBack}>돌아가기</Button>{' '}
                  <Button type="reset" variant="secondary" value="Reset" >초기화</Button>
                </Col>
            </Form.Group>
          </Form>
        </div>
    </>
  )
}

export default MyPageDetail