import { Button, Space, Switch, Table, Tag, Transfer, message} from 'antd';
import difference from 'lodash/difference';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import MainHeader from '../include/MainHeader';
import Adminbar from './Adminbar';
import Bottom from '../include/Bottom';
import { AdminServiceListDB } from '../../service/KhServiceDBLogic';

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



const AdminService = () => {
/* 로딩  메시지*/
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
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
  const [UnCheckServiceList, setUnCheckServiceList] = useState([]) /* 미승인 리스트 */
  const [CheckServiceList, setCheckServiceList] = useState([]) /* 승인 리스트 */

 /************ 값 가져오기 start **********/
useEffect(() =>{   
  openMessage();    /* 로딩  메시지*/
  const boardList = async() => {
  const res = await AdminServiceListDB()
  const list0 = []
  const list1 = []
  res.data.forEach((item) => {
    const obj = {
      user_id: item.user_id,
      service_date: item.service_date,
      service_radios: item.service_radios,
      service_person: item.service_person,
      service_memo: item.service_memo,        
      service_check: item.service_check,        
    }
    if(item.service_check === 0){  /* 등록시 기본값 0, 관리자가 승인해주면 1 */
      list0.push(obj)
    }else{
      list1.push(obj)
    }
    console.log(list0)
    console.log(list1)
  })    
  setUnCheckServiceList(list0)
  setCheckServiceList(list1)   
}
boardList();
},[])
 /************ 값 가져오기 end **********/

  /************ 값 넣기 start **********/
const mockData = UnCheckServiceList.map((item, i) => ({
  key: i.toString(),
  user_id: item.user_id, 
  service_date: item.service_date,
  service_person: item.service_person,
  service_radios: item.service_radios,
  service_memo: item.service_memo,
}));

const leftTableColumns = [
  {
    dataIndex: 'user_id',
    title: '성명',
  },
  {
    dataIndex: 'service_date',
    title: '방문일자',
    render: (service_date) => <Tag>{service_date}</Tag>,
  },
  {
    dataIndex: 'service_person',
    title: '인원',
  },
  {
    dataIndex: 'service_radios',
    title: '신청목적',
    render: (service_radios) => <Tag>{service_radios}</Tag>,
  },
  {
    dataIndex: 'service_memo',
    title: '자기소개',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'user_id',
    title: '이름',
  },
  {
    dataIndex: 'service_date',
    title: '방문일자',
  },
  {
    dataIndex: 'service_person',
    title: '인원',
  },
];
  /************ 값 넣기 end **********/

 /* 초기상태 선언 */
  const [targetKeys, setTargetKeys] = useState(); 
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  /* 비활성화 버튼 */
  const triggerDisable = (checked) => {
    setDisabled(checked);
  };
  /* 검색하기 버튼 */
  const triggerShowSearch = (checked) => {
    setShowSearch(checked);
  };


  return (
    <>
     {contextHolder}   {/*로딩  메시지*/ }
      <MainHeader />
      <Adminbar/>
      <br />
  
      <h2 style={{marginTop: "30px", textAlign: "center"}}> 자원봉사 신청목록 </h2>
      <br />
    <Container>
      
      <TableTransfer
        dataSource={mockData}
        targetKeys={targetKeys}
        disabled={disabled}
        operations={['승인', '취소']}
        showSearch={showSearch}
        onChange={onChange}
        
        filterOption={(inputValue, item) =>
          item.user_id.indexOf(inputValue) !== -1 
          || item.service_date.indexOf(inputValue) !== -1 
          || item.service_radios.indexOf(inputValue) !== -1

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
        loading={loadings[0]} 
        onClick={() => enterLoading(0)} 
        style={{height:"23px", paddingTop:"0px", marginTop:"5px"}}>
          저장
      </Button>


    <Button type="primary" danger style={{height:"23px", paddingTop:"0px", marginTop:"5px"}}>
      삭제
    </Button>

      </Space>
      </Container>
      <br />
      <br />
      <Bottom />
    </>
  );
};
export default AdminService;