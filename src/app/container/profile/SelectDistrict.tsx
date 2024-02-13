import { Select } from "antd";
import * as React from "react";
import { useStoreActions, useStoreState } from "../../store/hooks/easyPeasy";
const { Option } = Select;

export interface SelectDistrict {
  onChange?: any;
  selected?: any;
  defaultSelected?: any;
  style?: any
}

export const SelectDistrict = ({
  onChange,
  selected,
  defaultSelected,
  style
}: SelectDistrict) => {
  const districtList = useStoreState((state) => state.auth.districtList);
  const districtListFetch = useStoreActions((state) => state.auth.districtListFetch);
  const thanaListFetch = useStoreActions((state) => state.auth.thanaListFetch);
  if (districtList === null) {
    districtListFetch();
  }

  const onSelect = (districtsId) => {
    if (districtList) {
      const distrcit = districtList.find((item) => item.districtId === districtsId);
      onChange(distrcit?.districtId);
    }
  };

  React.useEffect(() => {
    if (selected) {
      thanaListFetch(selected);
    }
  }, [selected])


  return (
    <Select
      onChange={onSelect}
      // loading={loading}
      showSearch
      // allowClear
      defaultValue={defaultSelected}
      value={selected}
      style={style}
      placeholder="Select District"
      filterOption={(input, option:any) =>
        option !== undefined &&
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {districtList ? (
        districtList.map((type, idx) => (
          <Option key={type.districtId} value={type.districtId}>
            {type.districtName}
          </Option>
        ))
      ) : (
        <Option value="fetching">Fetching District</Option>
      )}
    </Select>
  );
};
