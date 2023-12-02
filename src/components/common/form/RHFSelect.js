import { Button, Form } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import propTypes from "prop-types";
import ReactSelect, { components, createFilter } from "react-select";

const Menu = ({ onClickAdd, hasAddOption, children, ...rest }) => (
  <components.MenuList {...rest}>
    {children}
    {hasAddOption && (
      <Button
        variant="secondary"
        type="button"
        onClick={onClickAdd}
        className="w-100 font-weight-bold rounded-0 mt-1 bg-hover-light-primary"
      >
        Add New
      </Button>
    )}
  </components.MenuList>
);
Menu.propTypes = {
  onClickAdd: propTypes.func,
  hasAddOption: propTypes.bool,
  children: propTypes.node
};

const dummyOptions = [
  {
    label: "Option 1",
    value: "1"
  },
  {
    label: "Option 2",
    value: "2"
  },
  {
    label: "Option 3",
    value: "3"
  }
];

export const RHFSelect = ({
  name,
  label,
  isMulti,
  options,
  hasAddOption,
  onClickAdd,
  customMenu: CustomMenu,
  groupStyles,
  groupClassName,
  required,
  hasDummyOptions,
  noOptional,
  requiredObject,
  ...rest
}) => {
  const { control } = useFormContext();
  const selectOptions = hasDummyOptions ? dummyOptions : options;
  const getSelectValue = value => {
    if (!value || !selectOptions) return "";
    if (isMulti) {
      console.log(selectOptions.value);
      return selectOptions.filter(option =>
        value?.includes(option.value)
      );
    }
    return selectOptions.filter(option => option.value === value)[0];
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => (
        <Form.Group
          className={groupClassName + "mb-3"}
          style={groupStyles}
        >
          {!!label && (
            <Form.Label>
              {label}{" "}
              {!required && (
                <span className="text-500">
                  {!noOptional && "(optional)"}
                </span>
              )}
            </Form.Label>
          )}
          <ReactSelect
            value={getSelectValue(value)}
            onChange={option => {
              if (isMulti) {
                onChange(
                  option.map(item =>
                    requiredObject ? item : item.value
                  )
                );
              } else {
                onChange(requiredObject ? option : option.value);
              }
            }}
            classNamePrefix="react-select"
            isMulti={isMulti}
            options={selectOptions}
            closeMenuOnSelect={!isMulti}
            {...rest}
            components={{
              IndicatorSeparator: () => null,
              MenuList: props =>
                CustomMenu ? (
                  <CustomMenu {...props} />
                ) : (
                  <Menu
                    {...props}
                    onClickAdd={onClickAdd}
                    hasAddOption={hasAddOption}
                  />
                )
            }}
            filterOption={createFilter({ ignoreAccents: false })}
          />
          {error && (
            <Form.Control.Feedback
              className="d-block"
              type="invalid"
            >
              {error.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      )}
    />
  );
};

RHFSelect.propTypes = {
  name: propTypes.string,
  label: propTypes.string,
  isMulti: propTypes.bool,
  options: propTypes.array,
  hasAddOption: propTypes.bool,
  onClickAdd: propTypes.func,
  customMenu: propTypes.func,
  groupStyles: propTypes.object,
  groupClassName: propTypes.string,
  required: propTypes.bool,
  hasDummyOptions: propTypes.bool,
  noOptional: propTypes.bool,
  requiredObject: propTypes.bool
};
