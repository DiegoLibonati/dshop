import React, { useState } from "react";

import type { JSX } from "react";
import type { FormSearchProps } from "@shared-core/types/props";

import SvgSearch from "@shared-core/components/Svgs/SvgSearch/SvgSearch";

import "@shared-core/components/Forms/FormSearch/FormSearch.css";

const FormSearch = ({ placeholder, className, onSubmit }: FormSearchProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmitForm: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    onSubmit(inputValue);
  };

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;

    setInputValue(value);
  };

  return (
    <form className={`form-search ${className}`} onSubmit={handleSubmitForm}>
      <button type="submit" aria-label="form search submit" className="form-search__btn">
        <SvgSearch className="form-search__btn-icon"></SvgSearch>
      </button>
      <input
        id="form-search-input"
        name="form-search-input"
        value={inputValue}
        placeholder={placeholder}
        className="form-search__input"
        onChange={onChangeInput}
      ></input>
    </form>
  );
};

export default FormSearch;
