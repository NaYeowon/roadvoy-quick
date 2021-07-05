/* eslint-disable */
import React from "react";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

import Header from "../Layout/Header";

const columns = [
  {
    title: "작성자",
    dataIndex: "aa",
    key: "aa",
    width: 300
  },
  {
    title: "글제목",
    dataIndex: "bb",
    key: "bb",
    render: text => <a href="/BoardDetail">{text}</a>
  },
  {
    title: "작성일",
    dataIndex: "cc",
    key: "cc",
    width: 300
  }
];

const data = [
  {
    aa: "aa",
    bb: "12",
    cc: "dasd"
  }
];
const Board = () => (
  <>
    <Header />
    <br />
    <br />
    <br />
    <div style={{ width: "1000px", marginRight: "auto", marginLeft: "auto" }}>
      <span style={{ float: "left" }}>
        <h2>게시판</h2>
      </span>
      <span style={{ float: "right" }}>
        <Link to="/Writing">
          <Button>글쓰기</Button>
        </Link>
      </span>
    </div>

    <Table
      columns={columns}
      style={{ width: "1000px", display: "table", marginRight: "auto", marginLeft: "auto" }}
      // style={{paddingLeft:'100px', paddingRight:'100px'}}
      dataSource={data}
      bordered
      // pagination={defaultCurrent={1} total={50}}
      size="small"
    />
  </>
);

export default Board;
