import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectExam {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectExam = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectExam) => {
  const itemList = useStoreState((state) => state.auth.publicexamList);
  


  
  const onSelect = (id) => {
    if (itemList) {
      const value = itemList.find((item) => item.id === id);
      onChange(value.id);
    }
  };
  
  return (
    <Select
      onChange={onSelect}
      // loading={loading}
      showSearch
      // allowClear
      defaultValue={defaultSelected}
      className="examList"
      value={selected}
      style={style}
      placeholder="Select Exam"
      filterOption={(input, option:any) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {itemList ? (
        itemList.map((type, idx) => (
          <Option key={type.id} value={type.id}>
            {type.name}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching Exam</Option>
      )}
    </Select>
  );
};
