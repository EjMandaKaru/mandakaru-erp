import { IformInput, IformBtn } from "@/interfaces";

export function Input({
  label,
  id,
  className = "",
  placeholder,
  errors,
  ...rest
}: IformInput) {
  return (
    <fieldset className="fieldset">
      <label htmlFor={id} className="fildset-legend mt-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        className={className + " input mt-2 w-full"}
        placeholder={placeholder}
        // required
        {...rest}
      />
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </fieldset>
  );
}

export function File(props: IformInput) {
  return (
    <fieldset className="fieldset">
      <label htmlFor={props.id} className="fieldset-legend">
        {props.label}
      </label>
      <input
        type="file"
        id={props.id}
        name={props.id}
        className="file-input"
        // required
      />
      <label className="label mb-2">{props.placeholder}</label>
    </fieldset>
  );
}

export function Button(props: IformBtn) {
  return (
    <button className={props.className + " btn btn-outline"}>
      {props.children}
    </button>
  );
}
