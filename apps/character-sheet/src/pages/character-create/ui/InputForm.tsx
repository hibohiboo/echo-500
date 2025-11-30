export const InputForm = (
  args: {
    id: string;
    label: string;
    placeholder: string;
  } & React.InputHTMLAttributes<HTMLInputElement>,
) => {
  const { id, label: _label } = args;
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label ">
        {_label}
      </label>
      <input
        {...args}
        id={id}
        name={id}
        className={`form-input ${args.className ?? ''}`}
      />
    </div>
  );
};
