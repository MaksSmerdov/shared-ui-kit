import {
  components,
  type OnChangeValue,
  type OptionProps,
  default as ReactSelect,
  type StylesConfig,
} from 'react-select';
import { type JSX, useMemo, useState } from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
  icon: JSX.Element;
}

export interface SelectProps {
  options: SelectOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  selectClassName?: string;
  size?: 'default' | 'compact';
  portalMenu?: boolean;
}

const Option = (props: OptionProps<SelectOption, false>) => (
  <components.Option {...props}>
    <div className={styles['option-content']}>
      <span className={styles['option-icon']}>{props.data.icon}</span>
      <span className={styles['option-label']}>{props.data.label}</span>
    </div>
  </components.Option>
);

function buildSelectStyles(
  size: 'default' | 'compact',
  portalVars: Record<string, string> | null
): StylesConfig<SelectOption, false> {
  const isCompact = size === 'compact';
  const controlMinHeight = isCompact ? 32 : 35;
  const controlRadius = isCompact ? 10 : 0;
  const placeholderFontSize = isCompact ? 13 : 16;
  const valueFontSize = isCompact ? 14 : 18;
  const optionPadding = isCompact ? 8 : 5;

  return {
    control: (base, state) => ({
      ...base,
      cursor: 'pointer',
      minHeight: controlMinHeight,
      borderRadius: controlRadius,
      backgroundColor: 'var(--select-control-bg)',
      border: '1px solid var(--select-border)',
      boxShadow: state.isFocused ? 'var(--select-shadow-focus)' : 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      '&:hover': {
        borderColor: 'var(--select-border-hover)',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--select-placeholder-color)',
      fontSize: placeholderFontSize,
    }),
    singleValue: (base) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      color: 'var(--select-value-color)',
      fontSize: valueFontSize,
      fontWeight: 600,
    }),
    valueContainer: (base) => ({
      ...base,
      color: 'var(--select-value-color)',
    }),
    input: (base) => ({
      ...base,
      color: 'var(--select-value-color)',
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: 'var(--border-default)',
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? 'var(--hulk)' : 'var(--select-dropdown-indicator)',
      '&:hover': {
        color: 'var(--hulk)',
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: controlRadius,
      overflow: 'hidden',
      border: '1px solid var(--select-border)',
      backgroundColor: 'var(--select-menu-bg)',
      boxShadow:
        '0 10px 24px color-mix(in srgb, var(--black, #000) 10%, transparent), 0 0 0 1px color-mix(in srgb, var(--hulk, #2f8f4e) 10%, var(--border-default, #d0d7de))',
      zIndex: 1600,
    }),
    option: (base, state) => ({
      ...base,
      padding: optionPadding,
      cursor: 'pointer',
      transition: 'background-color 0.18s ease',
      backgroundColor: state.isSelected
        ? 'var(--select-selected-bg)'
        : state.isFocused
          ? 'var(--select-focus-bg)'
          : 'var(--select-menu-bg)',
      color: state.isSelected ? 'var(--select-selected-color)' : 'var(--select-option-color)',
    }),
    menuList: (base) => ({
      ...base,
      zIndex: 1600,
      backgroundColor: 'var(--select-menu-bg)',
      borderTop: '1px solid color-mix(in srgb, var(--hulk, #2f8f4e) 14%, var(--border-default, #d0d7de))',
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 1600,
      ...(portalVars ?? {}),
    }),
  };
}

const Select = ({
  options,
  selectedValue,
  onChange,
  placeholder = 'Выберите опцию',
  disabled = false,
  className,
  selectClassName,
  size = 'default',
  portalMenu = false,
}: SelectProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null);
  const selectOptions = options.map((item) => ({
    value: item.value,
    label: item.label,
    icon: item.icon,
  }));
  const menuPortalTarget = portalMenu && typeof document !== 'undefined' ? document.body : null;
  const defaultValue = selectOptions.find((option) => option.value === selectedValue) ?? null;

  const portalVars = useMemo(() => {
    if (!portalMenu || typeof window === 'undefined' || !wrapperElement) {
      return null;
    }

    const computed = window.getComputedStyle(wrapperElement);
    const keys = [
      '--select-border',
      '--select-border-hover',
      '--select-placeholder-color',
      '--select-value-color',
      '--select-control-bg',
      '--select-menu-bg',
      '--select-option-color',
      '--select-focus-bg',
      '--select-selected-bg',
      '--select-selected-color',
      '--select-active-bg',
      '--select-dropdown-indicator',
      '--select-shadow-focus',
    ] as const;

    const result: Record<string, string> = {};
    keys.forEach((key) => {
      const value = computed.getPropertyValue(key);
      if (value.trim()) {
        result[key] = value.trim();
      }
    });

    return Object.keys(result).length > 0 ? result : null;
  }, [portalMenu, wrapperElement]);

  return (
    <div ref={setWrapperElement} className={[styles['select-wrapper'], className ?? ''].filter(Boolean).join(' ')}>
      <ReactSelect<SelectOption>
        className={[styles.select, selectClassName ?? ''].filter(Boolean).join(' ')}
        classNamePrefix="custom-select"
        options={selectOptions}
        value={defaultValue}
        onChange={(selectedOption: OnChangeValue<SelectOption, false>) => {
          onChange(selectedOption?.value ?? selectOptions[0]?.value ?? '');
        }}
        components={{ Option }}
        placeholder={placeholder}
        isSearchable={false}
        isClearable={false}
        isDisabled={disabled}
        menuPortalTarget={menuPortalTarget}
        menuPosition={portalMenu ? 'fixed' : 'absolute'}
        menuShouldScrollIntoView={false}
        styles={buildSelectStyles(size, portalVars)}
      />
    </div>
  );
};

export default Select;
