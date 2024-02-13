import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectThana {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectThana = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectThana) => {
  const thanaList = useStoreState((state) => state.auth.thanaList);
  // const districtListFetch = useStoreActions((state) => state.common.districtListFetch);
  // const thanaListFetch = useStoreActions((state) => state.common.thanaListFetch);


  const onSelect = (thanaId) => {
    if (thanaList) {
      const thana = thanaList.find((item) => item.thanaId === thanaId);
      // console.log(thana);
      onChange(thana?.thanaId);
    }
  };

  // React.useEffect(() => {
  //   if (selected) {
  //     thanaListFetch(selected?.districtId);
  //   }
  // }, [selected])


  return (
    <Select
      onChange={onSelect}
      // loading={loading}
      showSearch
      allowClear
      defaultValue={defaultSelected}
      value={selected}
      style={style}
      placeholder="Select Thana"
      filterOption={(input, option:any) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {thanaList ? (
        thanaList.map((type, idx) => (
          <Option key={type.thanaId} value={type.thanaId}>
            {type.thanaName}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching Thana</Option>
      )}
    </Select>
  );
};
