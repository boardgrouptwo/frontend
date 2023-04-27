import React from 'react'

import MemoList from '../memo/MemoList'
import "../css/memoPage.css"
import MainHeader from '../include/MainHeader'
import MainBottom from '../include/MainBottom'

const MemoPage = () => {
  return (
    <div>
            <MainHeader/>
            <MemoList/>
            <MainBottom/>
          
    </div>
  )
}

export default MemoPage
