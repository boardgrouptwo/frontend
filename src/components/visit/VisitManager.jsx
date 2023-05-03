import { Button, Space, Switch, Table, Tag, Transfer, message} from 'antd';
import difference from 'lodash/difference';
import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import MainHeader from '../include/MainHeader';
import Bottom from '../include/Bottom';
import * as XLSX from 'xlsx'
import { VisitMDeleteDB, VisitMUpdateDB, VisitManagerListDB } from '../../service/VisitDBLogic';
import Adminbar from '../admin/Adminbar';
import { useSelector } from 'react-redux';

 // 함수를 정의합니다. data 파라미터는 엑셀로 내보낼 데이터입니다.
 const exportToExcel = (data) => {
 const visitworksheet = XLSX.utils.json_to_sheet(data); // data를 엑셀 워크시트 형식으로 변환합니다.

 ['순번', '이름', '면회신청일자', '인원',  '승인여부(1:승인)', '고유번호'].forEach((columnName, index) => {
   const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 }); // 셀 주소를 계산합니다. 첫 번째 행의 각 열에 컬럼명이 들어갑니다.
   visitworksheet[cellAddress].v = columnName; // 각 셀에 컬럼명을 입력합니다.
 });
 
 const hiddenColumns = ['visit_no']; // 엑셀에서 숨길 컬럼명을 배열에 담습니다.
 hiddenColumns.forEach((columnName, index) => {
   const columnIndex = XLSX.utils.decode_col(columnName); // 숨길 컬럼의 인덱스를 계산합니다.
   visitworksheet[`!cols`] = visitworksheet[`!cols`] || []; // 만약 worksheet에 !cols 속성이 없으면 생성합니다.
   visitworksheet[`!cols`][columnIndex] = { hidden: true }; // 숨길 컬럼의 속성(hidden)을 true로 설정합니다.
 });
 
 const visitworkbook = XLSX.utils.book_new(); // 빈 워크북 객체를 생성합니다.
 XLSX.utils.book_append_sheet(visitworkbook, visitworksheet, 'Data'); // 워크시트를 워크북에 추가합니다.
 const wbout = XLSX.write(visitworkbook, { type: 'binary', bookType: 'xlsx' }); // 워크북을 바이너리 형식의 엑셀 파일로 변환합니다.
 const fileName = '면회신청목록.xlsx'; // 다운로드할 파일명을 지정합니다.
 const fileBuffer = new ArrayBuffer(wbout.length); // ArrayBuffer 객체를 생성합니다.
 const view = new Uint8Array(fileBuffer); // Uint8Array 객체를 생성합니다.
 for (let i = 0; i < wbout.length; i++) { // 워크북의 각 바이트에 대해 반복합니다.
   view[i] = wbout.charCodeAt(i) & 0xff; // 각 바이트를 Uint8Array에 저장합니다.
 }
 const blob = new Blob([fileBuffer], { type: 'application/octet-stream' }); // Blob 객체를 생성합니다.
 const link = document.createElement('a'); // a 요소를 생성합니다.
 link.href = URL.createObjectURL(blob); // 다운로드 링크를 생성합니다.
 link.download = fileName; // 파일명을 지정합니다.
 link.click(); // 다운로드 링크를 클릭합니다.
};
/******** 엑셀 내보내기end *********/

const VisitManager = () => {
  const userId = useSelector(state => state.userid); 
  const token = useSelector(state => state.token); 
  /*  Ant Design에서 제공하는 컴포넌트, 두 개의 목록(리스트) 간의 데이터 이동을 간편하게 제공해주는 컴포넌트  */
  const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps}>  
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
        const rowSelection = {
          getCheckboxProps: (item) => ({  /* 각 행의 체크박스 속성을 설정 */
            disabled: listDisabled || item.disabled,
          }),
          onSelectAll(selected, selectedRows) {  /* 전체 선택 체크박스가 클릭되었을 때 호출 */
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected); 
            /* 선택된 행의 key 값을 배열로 받아와서, 현재 선택된 행의 key 값과 이전에 선택된 행의 key 값을 비교하여, 선택된 항목의 key 값을 반환 */
          },
          onSelect({ key }, selected) { /* 각 행의 체크박스가 클릭되었을 때 호출 */
            onItemSelect(key, selected);  /* 선택된 행의 key 값과 선택 여부를 반환 */
          },
          selectedRowKeys: listSelectedKeys,  /* 선택된 행의 key 값을 배열로 가짐 */
        };
        return (
          <Table
            rowSelection={rowSelection} /* 테이블에서 선택한 행을 관리하는 객체 */
            columns={columns}  /* 테이블에서 컬럼의 구성을 나타내는 배열 */
            dataSource={filteredItems} /* 테이블에서 표시할 데이터 소스 */
            size="small" 
            style={{
              pointerEvents: listDisabled ? 'none' : undefined, 
            }}  /*  테이블의 요소에 대한 마우스 이벤트를 허용/차단할지를 결정 */
            onRow={({ key, disabled: itemDisabled }) => ({ /* 각 행에 대한 이벤트 핸들러를 정의하는 함수 */
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );
  /* 로딩  메시지*/  
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: '로딩중...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: '로딩완료!',
        duration: 2,
      });
    }, 500);
  };

    /************ 저장 버튼 start **********/
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 3000);
    };
   /************ 저장 버튼 end **********/

   /************ 게시글 목록 start**********/
  const [unCheckReservationList, setUnCheckReservationList] = useState([]) /* 미승인 리스트 */
  const [checkReservationList, setCheckReservationList] = useState([]) /* 승인 리스트 */
  const [totalReservationList, setTotalReservationList] = useState([]) /* 전체 리스트 */
  const [render, setRender] = useState(0);  

 /************ 값 가져오기 start **********/
useEffect(() =>{   
  console.log("면회신청목록가져오기")
  openMessage();    /* 로딩  메시지*/
  const visitMList = async() => {
  const res = await VisitManagerListDB()
  const list0 = []
  const list1 = []
  const listAll =[]
  res.data.forEach((item) => {
    const obj = {
      user_id: item.user_id,
      visit_date: item.visit_date,
      visit_time: item.visit_time,
      visit_volume: item.visit_volume,
      service_check: item.service_chk,      
      visit_no: item.visit_no ,
      elder_name:item.elder_name
    }
    listAll.push(obj)
    setTotalReservationList(listAll) 
    if(item.service_chk === 0){  /* 등록시 기본값 0, 관리자가 승인해주면 1 */
      list0.push(obj)
    }else{
      list1.push(obj)
    }
  })    
  setUnCheckReservationList(list0)
  setCheckReservationList(list1)   
}
visitMList();
},[render])
 /************ 값 가져오기 end **********/

/************ 값 넣기 start **********/
const mockData = totalReservationList.map((item, i) => ({
  key: i.toString(),
      userid: item.user_id,
      visit_date: item.visit_date,
      visit_time: item.visit_time,
      visit_volume: item.visit_volume,
      service_check: item.service_check,      
      visit_no: item.visit_no,
      elder_name:item.elder_name
      
}));

  /****** tem.service_chk === 1 인 값 오른쪽으로 이동 **********/
const originTargetKeys = mockData
.filter((item) => item.service_check === 1 )
.map((item) => item.key);

const leftTableColumns = [
{
  dataIndex: 'userid',
  title: '성명',
},
{
  dataIndex: 'visit_date',
  title: '방문일자',
  render: (visit_date) => <Tag>{visit_date}</Tag>,
},
{
  dataIndex: 'visit_time',
  title: '방문시간',
  render: (visit_time) => <Tag>{visit_time}</Tag>,
},
{
  dataIndex: 'visit_volume',
  title: '인원',
},

{
  dataIndex: 'elder_name',
  title: '어르신',
},
];
const rightTableColumns = [
  {
    dataIndex: 'userid',
    title: '성명',
  },
  {
    dataIndex: 'visit_date',
    title: '방문일자',
    render: (visit_date) => <Tag>{visit_date}</Tag>,
  },
  {
    dataIndex: 'visit_time',
    title: '방문시간',
    render: (visit_time) => <Tag>{visit_time}</Tag>,
  },
  {
    dataIndex: 'visit_volume',
    title: '인원',
  },
  
  {
    dataIndex: 'elder_name',
    title: '어르신',
  },
];
/************ 값 넣기 end **********/

/* 초기상태 선언 */
const tableTransferRef = useRef(null);
const [targetKeys, setTargetKeys] = useState([]); 
const [disabled, setDisabled] = useState(false);
const [showSearch, setShowSearch] = useState(false);
const [selectedKeys, setSelectedKeys] = useState([]);


const onChange = async(nextTargetKeys, direction, movekeys) => {
    console.log(nextTargetKeys)//몇번쨰 배열인지 확인
    const selectedData = mockData.filter((item) => nextTargetKeys.includes(item.key));
    const data = {
        visit_no : selectedData.map((item)=>item.visit_no)
    };
    await VisitMUpdateDB(data,token);
    setRender(render+1); 
    
};

let checkService = [];

const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
  const selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
  const selectedItems = mockData.filter((item) => selectedKeys.includes(item.key));
  checkService=[]
  checkService.push(selectedItems)
}

/* 비활성화 버튼 */
const triggerDisable = (checked) => {
  setDisabled(checked);
};
/* 검색하기 버튼 */
const triggerShowSearch = (checked) => {
  setShowSearch(checked);
};

/* 삭제하기 버튼 */

const visitMDelete = async () => {
const data = {
  visit_no : checkService[0].map((item)=>item.visit_no)
};
await VisitMDeleteDB(data,token);
setRender(render+1); 
};



  return (
    <>
      {contextHolder}   {/*로딩  메시지*/ }
      <MainHeader />
      <Adminbar/>
      <br />
  
      <h2 style={{marginTop: "30px", textAlign: "center"}}> 면회 신청 목록 </h2>
      <br />

    <Container>
      
    <TableTransfer      
        dataSource={mockData}
        targetKeys={originTargetKeys}
        disabled={disabled}
        operations={['승인', '취소']}
        showSearch={showSearch}
        onChange={onChange}
        onSelectChange={onSelectChange}
        filterOption={(inputValue, item) =>
            item.userid.indexOf(inputValue) !== -1 
            || item.visit_date.indexOf(inputValue) !== -1 
            || item.visit_time.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
    />
      <Space
        style={{
          marginTop: 16,
        }}
      >
        <Switch
          unCheckedChildren="비활성화"
          checkedChildren="비활성화"
          checked={disabled}
          onChange={triggerDisable}
        />
        <Switch
          unCheckedChildren="검색하기"
          checkedChildren="검색하기"
          checked={showSearch}
          onChange={triggerShowSearch}
        />

      <Button
            type="primary"
            danger
            style={{ height: '23px', paddingTop: '0px', marginTop: '5px' }}
            onClick={visitMDelete}
          >
            삭제
      </Button>
      <Button
            type="default"
            style={{ height: '23px', paddingTop: '0px', marginTop: '5px' }}
            onClick={() => exportToExcel(mockData)}
          >
            엑셀 다운
      </Button>

      </Space>
      </Container>
      <br />
      <br />
      <Bottom />
    </>
  )
}

export default VisitManager
