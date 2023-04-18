import { Space, Switch, Table, Tag, Transfer } from 'antd';
import difference from 'lodash/difference';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import MainHeader from '../include/MainHeader';
import Adminbar from './Adminbar';
import Bottom from '../include/Bottom';

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
const mockTags = ['2023-04-19', '2023-04-20', '2023-04-21'];
const mockData = Array.from({
  length: 20,
}).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,

  date: mockTags[i % 3],
}));
const originTargetKeys = mockData
  .filter((item) => Number(item.key) % 3 > 1)
  .map((item) => item.key);
const leftTableColumns = [
  {
    dataIndex: 'title',
    title: '성명',
  },
  {
    dataIndex: 'date',
    title: '방문일자',
    render: (date) => <Tag>{date}</Tag>,
  },
  {
    dataIndex: 'title',
    title: '인원',
  },
  {
    dataIndex: 'title',
    title: '신청목적',
  },
  {
    dataIndex: 'description',
    title: '자기소개',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: '이름',
  },
  {
    dataIndex: 'title',
    title: '방문일자',
  },
  {
    dataIndex: 'title',
    title: '인원',
  },
];
const AdminService = () => {
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const triggerDisable = (checked) => {
    setDisabled(checked);
  };
  const triggerShowSearch = (checked) => {
    setShowSearch(checked);
  };
  return (
    <>
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
          item.title.indexOf(inputValue) !== -1 || item.date.indexOf(inputValue) !== -1
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
      </Space>
      </Container>
      <br />
      <br />
      <Bottom />
    </>
  );
};
export default AdminService;