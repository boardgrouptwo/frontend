import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Dropdown, DropdownButton, Figure, Form, InputGroup, Row } from 'react-bootstrap'
import MainHeader from '../../include/MainHeader'
import { ProductUploadDB, imageUploadDB, shopAddDB } from '../../../service/ShopDBLogic'
import { useNavigate } from 'react-router'
import Adminbar from '../../admin/Adminbar'
import Bottom from '../../include/Bottom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const ShopAdd = () => {

  const navigate = useNavigate();
  const auth = useSelector(state => state.user_type);

  useEffect(() => {
    if(auth !== 'admin') {
      navigate("/login")
    }
  },[])

  const [selectedFile, setSelectedFile] = useState();
  const [imageUrl, setImageUrl] = useState()
  const [imageName, setImageName] = useState()
  const[title,setTitle] = useState("") 
  const[price,setPrice] = useState(0)
  const[detail,setDetail] = useState("")
  const [showError, setShowError] = useState(false);//폼 검증 유효성 검사
  const [validated, setValidated] = useState(false); //폼 검증 유효성 검사

  const handleTitle = useCallback((e) => {
    setTitle(e)
  },[])
  const handlePrice = useCallback((e) => { //QuillEditor에서 담김 - 태그포함된 정보
    setPrice(e)
  },[])
  const handleDetail = useCallback((e) => {
    setDetail(e)
  },[])

  const handleFileChange = (event) => {
    //setSelectedFile(event.target.files[0]);
    handleImageUpload(event.target.files[0]);
  };

  const handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file)
    imageUploadDB(formData)
      .then((res) => {
        setImageName(res.data)
        setImageUrl("http://localhost:3000/images/shop/"+res.data)
                
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleSubmit = async (event) => {
    console.log("test")
    const form = event.currentTarget;
    if (form.checkValidity() === false) { //유효 확인 실패 했을 경우
      event.preventDefault();  //이벤트 중단
      event.stopPropagation(); //이벤트 중단
    }
    setValidated(true);  // validated 변수를 true로 설정

    event.preventDefault();

    const u_select = document.getElementById('select').value

    const product = {
      product_title: title, //상품명
      product_price: price, //금액
      product_image: imageName, //이미지 이름
      product_detail: detail, //상품 상세 설명
      product_type: u_select // 상품 타입      
    }
  
    if(title==="") {
      alert("상품명을 입력하세요")
    } else {
      console.log(product)
      const res = await ProductUploadDB(product);
      Swal.fire({
        icon: "success",
        title: "상품 등록되었습니다",
        showCancelButton: false,
        confirmButtonText: "확인",
        customClass: {
          confirmButton: "my-confirm-button"
        }
      }) 
      navigate("/shopmain?type=total")
    }
  };

  const handleCancel = () => {
    navigate("/shopmain?type=total")
  }

  return (
    <>
      <MainHeader/>
      <Adminbar/>
      <div className='sponContainer' style={{ }}>
      <Form className='sponsor-form' onSubmit={handleSubmit}>
          <h3 className='sponsor-form-text'>상품등록</h3>
        <Form.Group as={Row} className="mb-3" controlId="sponsor_number"
          style={{marginTop: "20px"}}>
          <Form.Label column sm={2}>
            상품명
          </Form.Label>
          <Col sm={8}>
          <Form.Control type="tel" placeholder="상품명을 작성해주세요"
          onChange={(e)=>{handleTitle(e.target.value)}} />
          </Col>
        </Form.Group>  

        <Form.Group as={Row} className= "mb-3" controlId="productPrice">
          <Form.Label  column sm={2} >금액</Form.Label>
          <Col sm={8}>
          <InputGroup hasValidation> 
            <InputGroup.Text id="productPrice"> \ </InputGroup.Text>
            <Form.Control
              type="text"
              pattern="[0-9]*"
              placeholder="1의 자리부터 작성해주세요"
              required
              onFocus={() => setShowError(true)}
              onBlur={() => setShowError(false)}
              onChange={(e)=>{handlePrice(e.target.value)}}
            />
            <Form.Control.Feedback type="invalid" style={{ display: showError ? "block" : "none" }}>
              숫자만 입력 가능합니다.
            </Form.Control.Feedback>
          </InputGroup>          
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="sponsor_number"
          style={{marginTop: "10px"}}>
          <Form.Label column sm={2}>
            상세설명
          </Form.Label>
          <Col sm={8}>
          <Form.Control type="tel" placeholder="상품 상세설명을 작성해주세요"
          onChange={(e)=>{handleDetail(e.target.value)}} />
          </Col>

          <Form.Select id="select" aria-label="Default select example" style={{ marginTop: "20px", height: '38px', width:'160px'}}>
            <option value="많이 선물한">많이 선물한</option>
            <option value="받고 만족한">받고 만족한</option>
          </Form.Select>
        </Form.Group>  
        <div style={{margin: "20px"}}>
            <input type="file" onChange={handleFileChange} />
            {imageUrl 
              && 
              <img style={{ width: "305px", height: "300px", margin: "30px", padding: "0"}}
              src={imageUrl} alt="Upload image" />}
          </div>   
      <Button type="submit" style={{marginRight: "20px"}}variant="success">상품등록</Button>
      <Button variant="success" onClick={handleCancel}>뒤로가기</Button>
      </Form>
      </div>
      <Bottom/>
    </>
  )
}

export default ShopAdd
