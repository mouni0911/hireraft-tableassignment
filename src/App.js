import "./App.css";
import { Table, Input, Button, Space } from "antd";
import React, { useState } from "react";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const App = () => {
  const [dataSource] = useState([
    { _id: 101, name: "Mounika", experience: 5 },
    { _id: 206, name: "Lakshmi", experience: 8 },
    { _id: 304, name: "sai", experience: 3 },
    { _id: 674, name: "Durga", experience: 11 },
    { _id: 805, name: "Venkat", experience: 3 },
    { _id: 100, name: "sarala", experience: 7 },
    { _id: 854, name: "Chaitany", experience: 3 },
    { _id: 300, name: "saikumar", experience: 2 },
    { _id: 650, name: "Prem", experience: 7 },
    { _id: 420, name: "Sindhu", experience: 8 },
  ]);

  const [filterName, setFilterName] = useState(null);
  const [filterExpecrience, setFilterExperience] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleNameFilterChange = (e) => {
    const value = e.target.value;
    setFilterName(value);
  };

  const handleExperienceFilterChange = (e) => {
    const value = e.target.value;
    setFilterExperience(value);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };

  const resetFilters = () => {
    setFilterName(null);
    setFilterExperience(null);
    setSearchText("");
  };

  const sortedDataSource = [...dataSource].sort((a, b) => {
    if (sortDirection === "asc") {
      if (typeof a[sortedColumn] === "string") {
        return a[sortedColumn].localeCompare(b[sortedColumn]);
      } else {
        return a[sortedColumn] - b[sortedColumn];
      }
    } else {
      if (typeof b[sortedColumn] === "string") {
        return b[sortedColumn].localeCompare(a[sortedColumn]);
      } else {
        return b[sortedColumn] - a[sortedColumn];
      }
    }
  });

  const filteredDataSource = sortedDataSource.filter(
    (item) =>
      (filterName === null || item.name.includes(filterName)) &&
      (filterExpecrience === null ||
        item.experience.toString().includes(filterExpecrience)) &&
      (searchText === "" ||
        Object.values(item)
          .map((val) => val.toString())
          .some((val) => val.includes(searchText)))
  );

  const columns = [
    {
      title: (
        <div>
          ID
          {sortedColumn === "_id" ? (
            sortDirection === "asc" ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )
          ) : (
            <CaretUpOutlined />
          )}
        </div>
      ),
      dataIndex: "_id",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Filter ID"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => {
              confirm();
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
              }}
              icon={<i className="anticon anticon-filter"></i>}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record._id === parseInt(value),
      sortOrder: sortedColumn === "_id" && sortDirection,
      onHeaderCell: () => ({
        onClick: () => {
          handleSort("_id");
        },
      }),
    },
    {
      title: (
        <div>
          Name
          {sortedColumn === "name" ? (
            sortDirection === "asc" ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )
          ) : null}
          {/* <SearchOutlined
            style={{ marginLeft: 5, fontSize: 16, cursor: "pointer" }}
            onClick={() => handleSearch(filterName || "")}
          /> */}
        </div>
      ),
      dataIndex: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Filter name"
            value={selectedKeys[0]}
            onChange={handleNameFilterChange}
            onPressEnter={() => {
              handleSearch(selectedKeys[0]);
              confirm();
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                handleSearch(selectedKeys[0]);

                confirm();
              }}
              icon={<i className="anticon anticon-filter"></i>}
              size="small"
              style={{ width: 90 }}
            >
              Filter
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      sortOrder: sortedColumn === "name" && sortDirection,
      onHeaderCell: () => ({
        onClick: () => {
          handleSort("name");
        },
      }),
    },
    {
      title: (
        <div>
          Experience
          {sortedColumn === "experience" ? (
            sortDirection === "asc" ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )
          ) : (
            <CaretUpOutlined />
          )}{" "}
        </div>
      ),
      dataIndex: "experience",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Filter Experience"
            value={selectedKeys[0]}
            onChange={handleExperienceFilterChange}
            onPressEnter={() => {
              confirm();
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
              }}
              icon={<i className="anticon anticon-filter"></i>}
              size="small"
              style={{ width: 90 }}
            >
              Filter
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.trips.toString().includes(value),
      sortOrder: sortedColumn === "experience" && sortDirection,
      onHeaderCell: () => ({
        onClick: () => {
          handleSort("experience");
        },
      }),
    },
  ];

  return (
    <div className="container">
      <div className="data">
        <Input
          placeholder="Search all columns"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <Button type="primary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredDataSource}
        pagination={false}
      ></Table>
    </div>
  );
};

export default App;
