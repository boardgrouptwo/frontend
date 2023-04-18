import { Space, Switch, Table, Tag, Transfer } from 'antd';
import difference from 'lodash/difference';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import MainHeader from '../include/MainHeader';
import Adminbar from './Adminbar';
import Bottom from '../include/Bottom';
// Customize Table Transfer
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
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{
            pointerEvents: listDisabled ? 'none' : undefined,
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
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
const mockTags = ['cat', 'dog', 'bird'];
const mockData = Array.from({
  length: 20,
}).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
  disabled: i % 4 === 0,
  tag: mockTags[i % 3],
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
    dataIndex: 'tag',
    title: '방문일자',
    render: (tag) => <Tag>{tag}</Tag>,
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
        disabled={disabled}operations={['승인', '취소']}
        showSearch={showSearch}
        onChange={onChange}
        
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
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