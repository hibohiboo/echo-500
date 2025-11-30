export const InputForm = (
  args: {
    id: string;
    label: string;
    placeholder: string;
    value?: string;
    onChange?: (value: string) => void;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>,
) => {
  const { id, label: _label, value, onChange, ...inputProps } = args;
  return (
    <>
      <label htmlFor={id} className="form-label ">
        {_label}
      </label>
      <input
        {...inputProps}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`form-input ${args.className ?? ''}`}
      />
    </>
  );
};
