import { IformInput, IformBtn } from "@/interfaces";

export function Input(props: IformInput) {
  return (
    <fieldset className="fieldset">
      <label htmlFor={props.id} className="fildset-legend mt-2">
        {props.label}
      </label>
      <input
        type="text"
        id={props.id}
        name={props.id}
        className={props.className + " input mt-2 w-full"}
        placeholder={props.placeholder}
        required
      />
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
        required
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
