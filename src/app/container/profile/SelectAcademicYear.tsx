import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectAcademicYear {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectAcademicYear = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectAcademicYear) => {
  const itemList = useStoreState((state) => state.auth.academicYearList);
  


  
  const onSelect = (id) => {
    if (itemList) {
      const value = itemList.find((item) => item.name === id);
      onChange(value.name);
    }
  };
  
  return (
    <Select
      onChange={onSelect}
      // loading={loading}
      showSearch
      // allowClear
      defaultValue={defaultSelected}
      className="yearSelect"
      value={selected}
      style={style}
      placeholder="Select Year"
      filterOption={(input, option:any) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {itemList ? (
        itemList.map((type, idx) => (
          <Option key={type.name} value={type.name}>
            {type.name}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching Academic Year</Option>
      )}
    </Select>
  );
};
