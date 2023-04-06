import React from 'react'
import MainHeader from '../../include/MainHeader'
import Noticebar from '../notice/Noticebar'

const QnAListPage = () => {


  return (
    <>
        <MainHeader/>
        <Noticebar/>
              <div>
                <h2>QnA게시판</h2>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John</td>
                      <td>Doe</td>
                      <td>john@example.com</td>
                    </tr>
                    <tr>
                      <td>Mary</td>
                      <td>Moe</td>
                      <td>mary@example.com</td>
                    </tr>
                    <tr>
                      <td>July</td>
                      <td>Dooley</td>
                      <td>july@example.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
    </>
  )
}

export default QnAListPage
