import React, { useCallback, useEffect, useState } from 'react'
import MainHeader from '../include/MainHeader'
import MyPageBar from '../board/mypage/MyPageBar'
import { Pagination, Table } from 'react-bootstrap'
import Bottom from '../include/Bottom'
import { useLocation, useNavigate } from 'react-router-dom'
import { paymentListDB } from '../../service/PaymentDBLogic'
import PayFilter from './PayFilter'
import PaymentRow from './PaymentRow'
import { useSelector } from 'react-redux'

const PaymentDetail = () => {
  const userId = useSelector(state => state.userid);      // 사용자 아이디
  const token = useSelector(state => state.token); 

  // 화면 전환 시 필요한 훅
  const navigate = useNavigate();
  // URL주소
  const search = decodeURIComponent(useLocation().search);

  // DB서버에서 받아온 정보 담기
  // 배열 타입 [{},{},{}] -> List<Map>, List<VO>
  const [ listBody, setListBody ] = useState([]);
  // pay_type 구분 라벨
  const [ payTypes ] = useState(["전체", "결제", "후원"]);
  // pay_type 상태 관리
  const [ pTitle, setPTitle ] = useState("전체");

  ////////////////////////// 페이징 ///////////////////////
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지당 게시글 수
  const MAX_PAGE_ITEMS = 5; // 페이지네이션에서 최대로 보일 페이지 수
  const [totalItems, setTotalItems] = useState(0); // 전체 게시글 수
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const groupSize = Math.ceil(MAX_PAGE_ITEMS / 2);
  const groupIndex = Math.floor((currentPage - 1) / MAX_PAGE_ITEMS);
  const startPage = groupIndex * MAX_PAGE_ITEMS + 1;
  const endPage = startPage + MAX_PAGE_ITEMS - 1;

  const groups = Array.from({ length: Math.ceil(totalPages / MAX_PAGE_ITEMS) }, (_, index) => {
    const start = index * MAX_PAGE_ITEMS;
    return pageNumbers.slice(start, start + MAX_PAGE_ITEMS);
  }).filter(group => group.includes(startPage) || group.includes(endPage) || (group[0] <= startPage && group[group.length - 1] >= endPage));
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page_num = searchParams.get('page');

  const[pageNum, setPageNum] = useState({
    page: page_num,
  })
    
  // 페이지 넘버 클릭
  const handlePageClick = (pageNumber) => {
    console.log("handlePageClick 호출")

    setCurrentPage(pageNumber);
    navigate("/paymentdetail?pay_type="+pTitle+"&page="+pageNumber)
  }
  ////////////////////////// 페이징 ///////////////////////


  const listHeaders = ["결제정보", "결제일", "결제금액", "결제내용"];
  const HeaderWidth = ["15%", "20%", "15%", "50%"];

  // 함수 메모이제이션 한다 - useCallback -> useMemo는 값을 메모이제이션
  const handlePTitle = useCallback((element) => {
    setPTitle(element);
  }, []);     // 의존배열이 비었으므로 한 번 메모이제이션 된 함수값을 계속 기억해둔다


  // listBody(컬럼명)는 상태 훅이다
  const listHeadersElements = listHeaders.map((listHeader, index) => 
    listHeader === "결제내용" ?
      <th key={index} style={{borderStyle: "solid", width: HeaderWidth[index], paddingLeft: "40px"}}>{listHeader}</th>
      : <th key={index} style={{width: HeaderWidth[index], textAlign: "center"}}>{listHeader}</th>
  )

  // 결제 리스트 출력
  const listItemsElements = listBody.map((listItem, index) => {
    console.log("listItemsElements 호출");

    return (
      <PaymentRow key={index} listItem={listItem} />
    )
  })



  useEffect(() => {
    const payList = async() => {
      const pay_type = search.split("&").filter((item) => {
        return item.match("pay_type")
      })[0]?.split("=")[1];
      console.log("조회 타입 : " + pay_type);

      // 쿼리스트링 없을 경우 "전체" 출력
      setPTitle(pay_type||"전체");
      console.log("사용자ID ===> " + userId);

      setPageNum({page: page_num})

      const paylist = {
        page: page_num,
        pay_type: pay_type,
        user_id: userId,             // 사용자 정보
      }

      const res = await paymentListDB(paylist, token);
      console.log(res.data);

      const list = [];

      const datas = res.data;
      datas.forEach((item, index) => {
        console.log(item)

        const obj = {
          pay_no: item.pay_no, 
          user_id: item.user_id, 
          pay_amount: item.pay_amount, 
          pay_date: item.pay_date, 
          pay_content: item.pay_content, 
          user_name: item.user_name,
          pay_type: item.pay_type,
        }

        list.push(obj);
      })
      setTotalItems(datas[0].total_count); // 검색된 건수

      setListBody(list);  
    }

    payList();
  }, [setListBody, setPTitle, page_num, search])



  return (
    <>
      <MainHeader />
      <MyPageBar />
      <div className="container" style={{position: "relative"}}>
        <div className="page-header">
          <h2 style={{marginTop: "30px"}}>결제내역</h2>
          <div style={{display:"flex", justifyContent:"space-between", height:"40px"}}>
            <PayFilter types={payTypes} type={true} id={"pay_type"} title={pTitle} handlePTitle={handlePTitle} />
          </div>
          <div className="row" style={{paddingBottom: "50px"}}>
            <Table bordered hover>
              <thead style={{backgroundColor: "#F5F5F5"}}>
                <tr style={{textAlign: "center"}}>
                  {/* 컬럼명 */}
                  {
                    listHeaders.map((listHeader, index) => 
                      <th key={index} style={{width: HeaderWidth[index], textAlign: "center"}}>{listHeader}</th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
                {listItemsElements}         {/* DB반환값 출력 */}
              </tbody>
            </Table>
            <hr />
          </div>
        </div>


        {/* 페이징 처리 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: '50px' }}>
          <Pagination>
              <Pagination.First onClick={() => handlePageClick(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1} />
              {
                groups.map((group, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Pagination.Ellipsis
                        disabled={currentPage < group[0]}
                        onClick={() => handlePageClick(group[0] - 1)}
                      />
                    )}
                    {group.map((pageNumber) => (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => handlePageClick(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    ))}
                    {index < groups.length - 1 && (
                      <Pagination.Ellipsis
                        disabled={currentPage >= group[group.length - 1]}
                        onClick={() => handlePageClick(group[group.length - 1] + 1)}
                      />
                    )}
                  </React.Fragment>
                ))
              }
              <Pagination.Next onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          </div>
        </div>
      <Bottom />
    </>
  )
}

export default PaymentDetail
